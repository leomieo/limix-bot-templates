# Template language compatibility

Application inspected: https://github.com/leomieo/limix-bot/tree/9683120d7b931b02e998b093f3f516083d1eb9f7

The current external library format has one string each for name, title, description and one tryAsking array. LibraryBotListing, LibraryBot, parseBotListing and parseLibraryBot in limix/overlay/server/limix-bot-library.ts do not preserve localized template copies. The existing readyBotCopy helper in limix/overlay/shared/ready-bots.ts returns the raw title, description and first starter example without selecting a locale. LimixBotGallery.tsx uses that helper for gallery cards. Existing UI localization translates interface labels but does not select translated template content.

No application files were modified. No new runtime schema fields or alternative bot IDs were introduced. These eight additions use English fallback strings in the existing version-1 schema. Complete Vietnamese display copy and starter examples are in agency-agents.vi.md. English user guidance: supply the relevant materials, goal and constraints; the bot reports assumptions, evidence and unverified work. Connect apps only when needed and authorized. This documentation is not automatically loaded by the app. Automatic Vietnamese display remains blocked on an application change.

## Required follow-up in leomieo/limix-bot (not implemented here)

Extend the existing localization mechanism to support external template IDs and carry translated name, role/title, description, user guidance and starter examples through both catalog and detail parsing. Apply the selected UI locale in gallery and import/setup views, with per-field English fallback. Keep soul in English and independent of UI language; retain the user's conversation-language choice. Add parser, gallery and import tests for Vietnamese, English, missing translations and unknown external IDs. Agree a backward-compatible transport using the application's existing conventions before adding localization data to the runtime template schema. Do not display both languages together.

## Phạm vi hiện tại

Ứng dụng chưa tự chọn bản dịch cho các mẫu ngoài mới. Tám mẫu dùng tiếng Anh dự phòng để giữ tương thích; bản tiếng Việt đầy đủ được lưu riêng trong tài liệu. Cần sửa phần đọc danh mục, đọc chi tiết, chọn nội dung theo ngôn ngữ và nhập mẫu ở kho ứng dụng trước khi có thể hiển thị tiếng Việt tự động. Kho ứng dụng không bị sửa hoặc đẩy thay đổi.
