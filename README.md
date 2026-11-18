# Limix Bot Templates

Kho Bot mẫu riêng cho Limix Bot. Trong ứng dụng, mở **Bản mẫu → Khám phá** để xem Bot và bấm **Cập nhật** để tải danh sách mới nhất.

Kho này có sẵn **116 Bot mẫu**, gồm 16 mẫu ban đầu và **100 mẫu chọn lọc chuyển đổi từ Agency Agents**. Mẫu nhóm Bot nằm tại [limix-bot-teams](https://github.com/leomieo/limix-bot-teams).

100 mẫu Agency Agents bao phủ lập trình, bảo mật, thiết kế, sản phẩm, quản lý dự án, kiểm thử, nội dung, tiếp thị, bán hàng, hỗ trợ và vận hành. Đây là lựa chọn biên tập theo độ hữu ích cho công việc thường gặp, không phải bảng xếp hạng lượt dùng: kho nguồn không cung cấp số liệu mức độ phổ biến riêng từng mẫu trong danh sách giới thiệu. Xem [tiêu chí và danh sách](docs/agency-agents-selection.md).

Các mẫu Agency Agents giữ định dạng phiên bản 1, hiển thị tên, vai trò, mô tả và câu gợi ý bằng tiếng Việt; chỉ dẫn vận hành bằng tiếng Anh. Ứng dụng hiện chưa chọn bản dịch nội dung mẫu theo ngôn ngữ giao diện. Bản tiếng Việt đầy đủ nằm tại [bản dịch](docs/agency-agents.vi.md); xem [kết quả kiểm tra và phần ứng dụng cần sửa](docs/localization-compatibility.md). Không thêm trường bản địa hóa mà ứng dụng chưa đọc được.

100 curated Agency Agents adaptations use the existing version-1 format with Vietnamese display copy. English display translations are preserved in docs/agency-agents.en.md until the application supports selecting template translations. Operating instructions stay English; replies follow the user's language. This is an editorial selection for common tasks, not a measured popularity ranking. See [pinned sources](docs/agency-agents-sources.json) and the [upstream MIT notice](licenses/agency-agents-MIT.txt).

## Thêm Bot mẫu

1. Sao chép một tệp trong `bots/`, ví dụ `bots/coder.json`, thành `bots/ten-bot.json`.
2. Đặt `id` trùng tên tệp, chỉ dùng chữ thường, số và dấu gạch ngang. Sửa tên, vai trò, mô tả và chỉ dẫn cho Bot.
3. Đẩy tệp lên nhánh `main`. GitHub Actions sẽ kiểm tra và tự cập nhật `catalog.json`.
4. Khi workflow **Update bot catalog** hoàn tất, mở Limix Bot và bấm **Cập nhật**.

Mẫu hợp lệ tối thiểu có cấu trúc sau.

```json
{
  "format": "limix.bot",
  "version": 1,
  "id": "sales-helper",
  "category": "sales",
  "name": "Sales Helper",
  "title": "Trợ lý bán hàng",
  "description": "Hỗ trợ trả lời khách và theo dõi đơn hàng.",
  "soul": "You help the user answer customer questions and track orders. Verify order data before answering. Ask for approval before sending messages or changing orders. Respond in the language the user requests.",
  "look": { "color": "green", "mascotBody": "cursor" },
  "tryAsking": ["Đơn hàng nào cần xử lý hôm nay?"],
  "apps": []
}
```

## Quy ước Anh–Việt

- Cả 116 mẫu dùng tiếng Việt cho vai trò, mô tả và câu gợi ý. Giữ thuật ngữ chuyên ngành tiếng Anh trong câu tiếng Việt khi phù hợp. Xem nội dung tham chiếu tiếng Anh của [16 mẫu ban đầu](docs/core-templates.en.md) và [100 mẫu Agency Agents](docs/agency-agents.en.md). Ứng dụng hiện đọc một bản nội dung hiển thị cho mỗi mẫu.
- `soul` là chỉ dẫn làm việc bằng tiếng Anh. Giữ đầy đủ quy tắc, giới hạn và yêu cầu xác minh.
- Với `agency-*`, tên, vai trò `title`, mô tả và câu gợi ý `tryAsking` dùng tiếng Việt. Bản tiếng Anh của nội dung hiển thị được lưu riêng, không ghép hai ngôn ngữ trên cùng thẻ. Chỉ dẫn vận hành, ghi chú kỹ thuật và prompt định kỳ dùng tiếng Anh. Bot trả lời theo ngôn ngữ người dùng yêu cầu.
- `category` nhận một trong các giá trị `everyday`, `work`, `writing`, `design`, `sales`, `personal`.
- Dùng `look` từ một mẫu có sẵn để chọn màu và hình hợp lệ.
- `apps` và `skills` dùng tên kỹ thuật gốc. Bot mẫu chỉ đề xuất kết nối. Người dùng tự cấp quyền trong ứng dụng.
- Ghi chú chỉ nằm ở `MEMORY.md` hoặc `memory/<ten>.md`. Tác vụ định kỳ được ứng dụng nhập ở trạng thái tạm dừng.

Khi sửa trên máy, chạy hai lệnh sau trước khi đẩy lên kho.

```sh
node scripts/update-catalog.mjs
node --test
```

Giữ tệp Bot dưới 64 KB, mô tả tối đa 300 ký tự, chỉ dẫn tối đa 8.000 ký tự và câu gợi ý tối đa 200 ký tự. Mẫu được tải về khi người dùng bấm **Dùng mẫu**.

## Giấy phép

Apache-2.0. Nguồn gốc các Bot mẫu được ghi trong `NOTICE`.
