## Postman ile API Testi

API'yi denemek için hazır bir Postman koleksiyonu var:
[Todo-App.postman_collection.json](docs/postman/Todo-App.postman_collection.json)

### Koleksiyonu içe aktarma (import)

1. Postman'i aç.
2. Sol üstteki **Import** düğmesine tıkla.
3. `docs/postman/Todo-App.postman_collection.json` dosyasını pencereye sürükle (ya da **Files** ile seç).
4. **Import** de. Solda **Todo App** koleksiyonu görünür.

### Çalıştırma

1. Backend'in çalıştığından emin ol (adres `http://localhost:8300`).
2. Önce **add todo** isteğini gönder. Cevaptaki `id` değerine bak.
3. **list by id**, **update todo** ve **delete todo** isteklerinde adresteki `2` sayısını, ekleme cevabında gördüğün `id` ile değiştir.
4. **list todo** ile tüm kayıtları görebilirsin.