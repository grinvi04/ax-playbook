/**
 * 첫 자동화 PoC — 시트 문의 → Claude 영문 답변 초안
 *
 * 업무 자동화 공통 뼈대의 실물:
 *   트리거(메뉴 버튼) → 컨텍스트(행 읽기) → LLM 판단(Claude) → 출력(옆 셀) → 사람 확인(초안만)
 *
 * 시트 구성 (탭 이름 무관):
 *   A열 = 고객 문의(원문)   B열 = Claude 생성 영문 답변 초안
 *
 * 사용법:
 *   1) A열에 문의를 붙여넣는다.
 *   2) 그 행(들)을 선택한다.
 *   3) 상단 메뉴 "🤖 Claude" → "선택 행 답변 초안 생성" 클릭.
 *   4) B열 초안을 사람이 검토·수정 후 발송. (자동 발송 안 함 — 신뢰 먼저)
 */

// 이 스크립트가 부를 모델. 품질 우선 = Opus 4.8.
// 비용을 낮추려면 아래 한 줄만 "claude-haiku-4-5" 또는 "claude-sonnet-5"로 바꾸면 됨.
var MODEL = "claude-opus-4-8";

/**
 * 트리거: 스프레드시트가 열릴 때 커스텀 메뉴를 만든다.
 * 비개발자(마케터)가 코드를 몰라도 버튼만 누르면 되는 "마지막 1마일".
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🤖 Claude")
    .addItem("선택 행 답변 초안 생성", "generateReplyDrafts")
    .addToUi();
}

/**
 * 메인 동작: 선택된 행마다 A열 문의를 읽어 Claude에 보내고, B열에 초안을 쓴다.
 */
function generateReplyDrafts() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var selection = sheet.getActiveRange(); // 사용자가 드래그로 선택한 범위
  if (!selection) {
    SpreadsheetApp.getUi().alert("먼저 문의가 있는 행을 선택하세요.");
    return;
  }

  var startRow = selection.getRow();
  var numRows = selection.getNumRows();
  var done = 0;

  for (var i = 0; i < numRows; i++) {
    var row = startRow + i;
    var inquiry = sheet.getRange(row, 1).getValue(); // A열
    if (!inquiry || String(inquiry).trim() === "") continue;

    var draftCell = sheet.getRange(row, 2); // B열
    draftCell.setValue("⏳ 생성 중...");
    SpreadsheetApp.flush(); // 진행 상황을 즉시 화면에 반영

    try {
      var draft = callClaude(String(inquiry));
      draftCell.setValue(draft);
      done++;
    } catch (err) {
      draftCell.setValue("❌ 오류: " + err.message);
    }
  }

  SpreadsheetApp.getActiveSpreadsheet().toast(done + "개 초안 생성 완료", "🤖 Claude", 3);
}

/**
 * LLM 판단: Claude Messages API를 raw HTTP로 호출한다.
 * Apps Script엔 SDK가 없으므로 UrlFetchApp로 직접 요청.
 * API 키는 코드에 하드코딩하지 않고 Script Properties에서 읽는다(시크릿 관리).
 */
function callClaude(inquiry) {
  var apiKey = PropertiesService.getScriptProperties().getProperty("ANTHROPIC_API_KEY");
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY 미설정 (프로젝트 설정 > 스크립트 속성)");
  }

  // 회사·브랜드·채널·지역은 실제 환경에 맞게 교체 (예: 마켓플레이스·브랜드명·언어)
  var systemPrompt =
    "You are a customer support agent for a consumer brand selling online. " +
    "Write a polite, warm, professional reply in natural English to the customer inquiry. " +
    "Be concise and helpful. Do not invent order numbers, prices, or policies you were not given — " +
    "if information is missing, ask for it courteously. Output only the reply body, no preamble.";

  var payload = {
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: inquiry }]
  };

  var response = UrlFetchApp.fetch("https://api.anthropic.com/v1/messages", {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true // 4xx/5xx도 예외 없이 받아서 직접 처리
  });

  var code = response.getResponseCode();
  var body = JSON.parse(response.getContentText());

  if (code !== 200) {
    var msg = body && body.error ? body.error.message : response.getContentText();
    throw new Error("API " + code + ": " + msg);
  }

  // 안전 검사: 거부 응답이면 content[0]가 없을 수 있음
  if (body.stop_reason === "refusal") {
    throw new Error("모델이 응답을 거부함(refusal)");
  }

  // content는 블록 배열 — 첫 text 블록을 꺼낸다
  var textBlock = null;
  for (var i = 0; i < body.content.length; i++) {
    if (body.content[i].type === "text") {
      textBlock = body.content[i].text;
      break;
    }
  }
  return textBlock || "(빈 응답)";
}
