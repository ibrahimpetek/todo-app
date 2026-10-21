# Todo Uygulaması: Sprint Planı

> **Not:** Bu plan, proje bittikten sonra mevcut koda bakılarak yeniden kurgulanmıştır.
> Hafta ve gün süreleri tahminidir; kendi gerçek takvimine göre düzenle.
>
> **Durum etiketleri:** ✅ Kodda mevcut · 🛠️ Proje temizliğinde yapıldı · 📋 Planlanan

## Proje Genel Tanımı

Katmanlı mimariyle geliştirilmiş, RESTful bir **yapılacaklar (Todo) uygulaması**.
Backend Spring Boot ile **Code First** yaklaşımında yazılmıştır: tablo, entity sınıfından
üretilir. Arayüz React ile yazılmıştır. Tüm sistem Docker Compose ile tek komutla ayağa kalkar.

## Kullanıcı Rolleri

Kimlik doğrulama yoktur, tek tip kullanıcı vardır. Herkes kendi tarayıcısından
todo ekler, listeler, günceller ve siler. *(Roller ve giriş sistemi Sprint 4 sonrası
için geliştirme fikridir.)*

## Temel Teknoloji Stack

| Katman | Teknoloji |
|---|---|
| Backend | Java 21, Spring Boot, Spring Data JPA, Lombok, Gradle |
| Veritabanı | PostgreSQL 15 |
| Frontend | React, axios, Bootstrap, react-icons |
| Altyapı | Docker, Docker Compose, nginx |

## Proje Mimarisi (Katmanlı Yapı)

```
com.example.backend
├── controller/   # REST endpoint'leri
├── dto/          # İstek ve cevap nesneleri
├── entity/       # JPA entity (Todo)
├── mapper/       # Entity <-> DTO dönüşümü
├── repository/   # Spring Data JPA arayüzü
└── service/      # İş mantığı (arayüz)
    └── impl/     # İş mantığı (uygulama)
```

---

## Sprint 1 (Hafta 1): Backend Altyapı ve CRUD API

### Sprint Hedefi
Veritabanına bağlanan, todo kayıtlarını oluşturan, okuyan, güncelleyen ve silen
çalışan bir REST API kurmak.

### Task 1.1: Proje Kurulumu (1 gün) ✅
- https://start.spring.io ile Gradle projesi: Java 21, Group `com.example`
- Bağımlılıklar: Spring Web MVC, Spring Data JPA, PostgreSQL Driver, Lombok
- Paket yapısını katmanlara göre oluşturma

**Çıktı:** Açılan boş Spring Boot projesi

### Task 1.2: Entity Tasarımı (1 gün) ✅
- `Todo` entity: `id` (otomatik artan), `title` (zorunlu), `completed`
- Tablo `ddl-auto=update` ile Hibernate tarafından üretilir

**Çıktı:** `todos` tablosu. Bkz. [ER diyagramı](er-diagram.md)

### Task 1.3: Repository Katmanı (0.5 gün) ✅
- `TodoRepository extends JpaRepository<Todo, Long>`

**Çıktı:** Hazır CRUD sorguları

### Task 1.4: DTO ve Mapper (1 gün) ✅
- `TodoRequestDto` (title, completed) ve `TodoResponseDto` (id, title, completed)
- `TodoMapper`: entity ↔ DTO dönüşümü

**Çıktı:** Entity'yi dışarı açmayan API sözleşmesi

### Task 1.5: Service Katmanı (1 gün) ✅
- `TodoService` arayüzü ve `TodoServiceImpl`
- Kayıt bulunamazsa hata fırlatma

**Çıktı:** İş mantığı controller'dan ayrılmış durumda

### Task 1.6: REST Controller (1 gün) ✅

| Metot | Endpoint | Açıklama |
|---|---|---|
| POST | `/api/todos` | Yeni todo ekle (201) |
| GET | `/api/todos` | Tüm todo'ları listele |
| GET | `/api/todos/{id}` | Tek todo getir |
| PUT | `/api/todos/{id}` | Todo güncelle |
| DELETE | `/api/todos/{id}` | Todo sil |

**Çıktı:** Postman ile test edilebilir API

### Opsiyonel Öğrenme Konusu: MapStruct
Projede MapStruct bağımlılığı tanımlı, ama `TodoMapper` elle yazılmış statik bir sınıf.
MapStruct ile aynı dönüşümü derleme anında otomatik kod üreterek yapabilirsin:

```java
@Mapper(componentModel = "spring")
public interface TodoMapper {
    TodoResponseDto toResponseDto(Todo todo);
    Todo toEntity(TodoRequestDto dto);
}
```

### Sprint 1 Çıktıları
- Çalışan CRUD API
- Katmanlı mimari (controller, service, repository)
- DTO deseni

---

## Sprint 2 (Hafta 2): React Ön Yüz

### Sprint Hedefi
API ile konuşan, todo'ları listeleyen ve yönetmeyi sağlayan bir arayüz geliştirmek.

### Task 2.1: Frontend Kurulumu (0.5 gün) ✅
- Create React App, Bootstrap ve react-icons kurulumu
- `axios` ile API iletişimi

### Task 2.2: Servis Katmanı (0.5 gün) ✅ 🛠️
- `todoService.js`: `getTodos`, `addTodo`, `updateTodo`, `deleteTodo`
- 🛠️ API adresi artık `REACT_APP_API_BASE_URL` ortam değişkeninden okunuyor

### Task 2.3: Bileşenler (2 gün) ✅
- `TodoInput`: yeni todo ekleme
- `TodoList` ve `TodoItem`: listeleme, tamamlandı işareti, düzenleme, silme
- `TodoSearch`: başlığa göre arama
- `TodoPage`: durum yönetimi ve API çağrılarını bir araya getirir

### Task 2.4: Arama (0.5 gün) ✅
- Arama, tarayıcıda yüklenmiş liste üzerinde yapılır (sunucuya istek gitmez)

**Çıktı:** Eklenebilen, düzenlenebilen, silinebilen ve aranabilen todo listesi

### Opsiyonel Öğrenme Konusu: Özel Hook
API çağrılarını ve durumu `TodoPage` içinden ayırıp `useTodos` adında bir hook'a taşıyabilirsin:

```javascript
function useTodos() {
  const [todos, setTodos] = useState([]);
  // yükleme, ekleme, güncelleme, silme burada
  return { todos, addTodo, toggleTodo, removeTodo };
}
```

### Sprint 2 Çıktıları
- Çalışan React arayüzü
- Servis katmanıyla ayrılmış API çağrıları

---

## Sprint 3 (Hafta 3): Docker ve Yayına Hazırlık

### Sprint Hedefi
Projeyi tek komutla çalışır hale getirmek, ayarları koddan ayırmak ve dokümante etmek.

### Task 3.1: Backend Dockerfile (0.5 gün) ✅ 🛠️
- İki aşamalı (multi-stage) derleme: JDK ile derle, küçük JRE imajıyla çalıştır
- 🛠️ Yetkisiz kullanıcıyla çalışma, `.dockerignore`, Windows satır sonu düzeltmesi

### Task 3.2: Frontend Dockerfile (0.5 gün) 🛠️
- Derleme aşaması (Node) + çalışma aşaması (nginx ile statik dosya sunumu)
- 🛠️ Önceden geliştirme sunucusu (`npm start`) çalışıyordu

### Task 3.3: Docker Compose (0.5 gün) ✅ 🛠️
- Üç servis: `postgres-db`, `backend`, `frontend`
- 🛠️ Veritabanı için `healthcheck`, backend veritabanı hazır olunca başlar
- 🛠️ Veritabanı portu sadece `127.0.0.1`'e açık

### Task 3.4: Ayar Yönetimi (0.5 gün) 🛠️
- Parola koddan kaldırıldı, `.env` ve `.env.example` yapısı kuruldu
- `application.properties` ortam değişkenlerinden okur
- CORS adresi ayarlanabilir hale getirildi

### Task 3.5: Dokümantasyon (1 gün) 🛠️
- Kök `README.md` (kurulum, API kullanımı, ortam değişkenleri)
- [ER diyagramı](er-diagram.md)
- Bu sprint planı

**Çıktı:** `docker compose up --build` ile ayağa kalkan, belgelenmiş proje

### Opsiyonel Öğrenme Konusu: Veritabanı Migrasyonu (Flyway)
`ddl-auto=update` geliştirme için rahattır, ama gerçek ortamda tablo değişiklikleri
sürümlenmiş SQL dosyalarıyla (Flyway veya Liquibase) yönetilir.

### Sprint 3 Çıktıları
- Docker ile çalışan tam sistem
- Parolasız kod tabanı
- Kapsamlı README ve diyagram

---

## Sprint 4 (Planlanan): Kalite ve Doğrulama 📋

### Sprint Hedefi
API'yi hatalara karşı dayanıklı, test edilmiş ve belgelenmiş hale getirmek.

### Task 4.1: Bean Validation (1 gün) 📋
- `title` için `@NotBlank` ve `@Size(max = 255)`
- Controller'da `@Valid`

### Task 4.2: Global Exception Handler (1 gün) 📋
- Şu an kayıt bulunamayınca `RuntimeException` atılıyor ve istemciye 500 dönüyor
- `ResourceNotFoundException` + `@ControllerAdvice` ile 404 ve standart hata cevabı

### Task 4.3: Testler (2 gün) 📋
- Şu an sadece `contextLoads` testi var
- Service katmanı için birim testleri (Mockito)
- Repository için `@DataJpaTest`, controller için `@WebMvcTest`

### Task 4.4: API Dokümantasyonu (0.5 gün) 📋
- springdoc-openapi ile Swagger UI
- Postman koleksiyonu

### Task 4.5: Otomatik Kontrol (0.5 gün) 📋
- GitHub Actions: her push'ta derle ve testleri çalıştır

### Sprint 4 Çıktıları
- 404 ve doğrulama hataları düzgün dönen API
- Test kapsamı
- Swagger dokümantasyonu

---

## Proje Teslim Edilecekler

- [x] Kaynak kod ve `.gitignore`
- [x] README.md (kurulum rehberi)
- [x] ER diyagramı
- [x] Docker ile çalıştırma
- [x] Sprint planı
- [ ] Swagger / Postman koleksiyonu (Sprint 4)
- [ ] Birim ve entegrasyon testleri (Sprint 4)

## Önemli Notlar

1. **Parola yönetimi:** Parolalar `.env` dosyasında tutulur, `.env` GitHub'a gönderilmez.
2. **React ortam değişkenleri** çalışma anında değil derleme anında koda gömülür.
   Adresi değiştirirsen frontend'i yeniden derle: `docker compose up --build`.
3. **Tablo yönetimi:** `ddl-auto=update` geliştirme içindir. Gerçek ortamda migrasyon aracı kullan.
