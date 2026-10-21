# Todo App

Spring Boot, PostgreSQL ve React ile yazılmış, Docker ile tek komutla çalışan
yapılacaklar (Todo) uygulaması.

## Özellikler

- Görev ekleme, listeleme, güncelleme ve silme (CRUD)
- Görevi tamamlandı olarak işaretleme ve başlığını düzenleme
- Başlığa göre arama
- Boş başlık engelleme (doğrulama) ve açıklayıcı hata cevapları (404, 400)
- Docker Compose ile tek komutla kurulum

## Teknolojiler

| Katman | Teknoloji |
|---|---|
| Backend | Java 17, Spring Boot 4.1.1, Spring Data JPA, Lombok, Gradle |
| Veritabanı | PostgreSQL 15 |
| Frontend | React, axios, Bootstrap, react-icons |
| Altyapı | Docker, Docker Compose, nginx |

## Proje Yapısı

```
todo-app/
├── docker-compose.yml
├── .env.example
├── docs/
│   └── postman/        # Postman koleksiyonu
├── todo-be/            # Spring Boot API
└── todo-fe/            # React arayüzü
```

## Projeyi Docker ile Çalıştırma

Veritabanı, backend ve frontend tek komutla ayağa kalkar.

**Gereksinim:** Docker Desktop (açık ve çalışır durumda)

### Kurulum

1. Ortam dosyasını oluştur:

```
   Copy-Item .env.example .env
```

   Linux veya macOS'ta: `cp .env.example .env`

2. `.env` dosyasını aç ve **`POSTGRES_PASSWORD`** değerini kendi parolanla değiştir.

3. Başlat:

```
   docker compose up -d --build
```

   İlk derleme bağımlılıkları indirdiği için birkaç dakika sürebilir.

4. Durumu kontrol et. Üç servis de görünmeli:

```
   docker compose ps
```

### Adresler

| Servis | Adres |
|---|---|
| Arayüz | http://localhost:3000 |
| API | http://localhost:8300/api/todos |
| PostgreSQL | localhost:5434 |

### Günlük kullanım

| Komut | Ne yapar |
|---|---|
| `docker compose up -d` | Başlatır |
| `docker compose up -d --build` | Kod değişince yeniden derleyip başlatır |
| `docker compose stop` | Durdurur, veri korunur |
| `docker compose down` | Konteynerleri siler, veritabanı verisi korunur |
| `docker compose down -v` | **Veritabanı verisini de siler** |
| `docker compose logs backend` | Backend loglarını gösterir |

## Docker Olmadan Çalıştırma (geliştirme)

**Gereksinimler:** JDK 17, Node.js, Docker Desktop (sadece veritabanı için)

1. Sadece veritabanını başlat:

```
   docker compose up -d postgres-db
```

2. Backend'i çalıştır (yeni bir terminalde):

```
   cd todo-be
   .\gradlew.bat bootRun
```

   Linux veya macOS'ta: `./gradlew bootRun`. Backend parolayı üst klasördeki `.env` dosyasından okur.

3. Frontend'i çalıştır (yeni bir terminalde):

```
   cd todo-fe
   npm install
   npm start
```

## API

Temel adres: `http://localhost:8300/api/todos`

| Metot | Adres | Açıklama | Başarılı cevap |
|---|---|---|---|
| POST | `/api/todos` | Yeni todo ekle | `201 Created` |
| GET | `/api/todos` | Tümünü listele | `200 OK` |
| GET | `/api/todos/{id}` | Tek todo getir | `200 OK` |
| PUT | `/api/todos/{id}` | Todo güncelle | `200 OK` |
| DELETE | `/api/todos/{id}` | Todo sil | `200 OK` |

İstek gövdesi (POST ve PUT):

```json
{ "title": "Süt al", "completed": false }
```

Hata cevapları aynı biçimdedir. Örneğin boş başlıkta `400 Bad Request`:

```json
{
  "timestamp": "2026-10-19T09:58:03.974508903",
  "status": 400,
  "error": "Bad Request",
  "message": "title: Başlık boş olamaz"
}
```

Var olmayan kayıtta `404 Not Found` döner.

## Ortam Değişkenleri

| Değişken | Zorunlu | Varsayılan | Açıklama |
|---|---|---|---|
| `POSTGRES_PASSWORD` | Evet | - | Veritabanı parolası |
| `POSTGRES_DB` | Hayır | `tododb` | Veritabanı adı |
| `POSTGRES_USER` | Hayır | `postgres` | Veritabanı kullanıcısı |
| `REACT_APP_API_BASE_URL` | Hayır | `http://localhost:8300/api/todos` | Arayüzün kullanacağı API adresi (derleme sırasında koda gömülür) |

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

## Sorun Giderme

- **`POSTGRES_PASSWORD .env dosyasında tanımlı olmalı`:** `.env` dosyasını oluşturmamışsın ya da parola satırı boş.
- **Port dolu hatası:** Başka bir program 3000, 8300 veya 5434 portunu kullanıyor. `docker ps` ile hangi konteynerin kullandığına bak.
- **Windows'ta port izin hatası:** `netsh interface ipv4 show excludedportrange protocol=tcp` komutuyla Windows'un ayırdığı port aralıklarını kontrol et.
- **Arayüz API'ye ulaşamıyor:** `REACT_APP_API_BASE_URL` derleme sırasında koda gömülür. Değiştirdiysen `docker compose up -d --build` ile yeniden derle.

## Henüz Yapılmayanlar

- Birim ve entegrasyon testleri
- Swagger / OpenAPI dokümantasyonu