# GlamCall - منصة المحادثات المرئية الاحترافية

## نظرة عامة

GlamCall هي منصة احترافية عالمية للمحادثات المرئية تربط بين المستخدمين والعارضات من جميع أنحاء العالم. تم تطوير التطبيق باستخدام أحدث التقنيات مع قاعدة بيانات Supabase وأنظمة مصادقة متقدمة لضمان تجربة مستخدم متميزة وآمنة.

## الميزات الرئيسية

### للمستخدمين
- 🎥 **محادثات مرئية عالية الجودة** - تقنية HD مع صوت واضح
- 💬 **دردشة مباشرة** - رسائل فورية مع إمكانية إرسال الهدايا
- 🌍 **عارضات من البلدان العربية** - تنوع ثقافي واسع
- 💰 **نظام عملات مرن** - شراء آمن وسهل للعملات
- 🔒 **أمان متقدم** - تشفير شامل وحماية الخصوصية
- ✅ **نظام تحقق شامل** - التحقق من الهوية للأمان
- 🌍 **دعم متعدد اللغات** - 15 لغة مختلفة
- 📱 **تطبيق تليجرام** - Mini App متكامل
- 🔍 **SEO محترف** - محسن لمحركات البحث
- 🗄️ **قاعدة بيانات متقدمة** - Supabase مع RLS
- 🔐 **مصادقة آمنة** - JWT + OAuth 2.0
- 📊 **تحليلات متقدمة** - إحصائيات مفصلة
- 🌐 **عارضات عالميات** - من جميع القارات والجنسيات

### للعارضات
- 💵 **كسب المال** - أرباح مجزية من المحادثات
- 📊 **لوحة تحكم متقدمة** - إحصائيات مفصلة وإدارة الحساب
- ⏰ **جدولة مرنة** - تحديد أوقات العمل المناسبة
- 💳 **مدفوعات سريعة** - تحويلات أسبوعية مضمونة
- 🛡️ **بيئة آمنة** - حماية من التحرش والسلوك غير اللائق

## التقنيات المستخدمة

- **Frontend**: React 18 + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + JWT
- **State Management**: React Query + React Hooks
- **Form Handling**: React Hook Form + Yup
- **Notifications**: React Hot Toast
- **Internationalization**: i18next + react-i18next
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Responsive Design**: Mobile-first approach
- **SEO**: React Helmet Async + Structured Data
- **Telegram**: Bot API + Mini App

## اللغات المدعومة

- 🇸🇦 العربية (Arabic)
- 🇺🇸 الإنجليزية (English)
- 🇪🇸 الإسبانية (Spanish)
- 🇫🇷 الفرنسية (French)
- 🇩🇪 الألمانية (German)
- 🇷🇺 الروسية (Russian)
- 🇧🇷 البرتغالية (Portuguese)
- 🇮🇹 الإيطالية (Italian)
- 🇯🇵 اليابانية (Japanese)
- 🇰🇷 الكورية (Korean)
- 🇨🇳 الصينية (Chinese)
- 🇮🇳 الهندية (Hindi)
- 🇹🇷 التركية (Turkish)
- 🇳🇱 الهولندية (Dutch)
- 🇸🇪 السويدية (Swedish)

## العارضات العالميات

العارضات متاحات من جميع القارات:
- **أمريكا الشمالية**: الولايات المتحدة، كندا، المكسيك
- **أوروبا**: روسيا، إيطاليا، السويد، ألمانيا، فرنسا
- **آسيا**: اليابان، الصين، الهند، كوريا الجنوبية
- **أمريكا الجنوبية**: البرازيل، كولومبيا، الأرجنتين
- **أفريقيا**: نيجيريا، جنوب أفريقيا، مصر
- **أوقيانوسيا**: أستراليا، نيوزيلندا
- **الشرق الأوسط**: جميع البلدان العربية

## التشغيل والتطوير

### متطلبات النظام
- Node.js 18+ 
- npm أو yarn

### التثبيت
```bash
# استنساخ المشروع
git clone https://github.com/your-username/glamcall.git

# الانتقال للمجلد
cd glamcall

# تثبيت التبعيات
npm install

# إعداد متغيرات البيئة
cp .env.example .env
# قم بتحديث متغيرات Supabase في ملف .env

# تشغيل migrations قاعدة البيانات
# (يتم تلقائياً عند الاتصال بـ Supabase)

# تشغيل الخادم التطويري
npm run dev
```

### إعداد Supabase

1. **إنشاء مشروع Supabase**
   - اذهب إلى [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - أنشئ مشروع جديد
   - احصل على Project URL و Anon Key من Settings > API

2. **تحديث متغيرات البيئة**
   - انسخ ملف `.env.example` إلى `.env`
   - حدث `VITE_SUPABASE_URL` بـ Project URL
   - حدث `VITE_SUPABASE_ANON_KEY` بـ Anon Key

3. **تشغيل Migrations**
   - في لوحة تحكم Supabase، اذهب إلى SQL Editor
   - انسخ محتوى ملفات `supabase/migrations/` وشغلها بالترتيب
   - أو استخدم Supabase CLI إذا كان متاحاً

### البناء للإنتاج
```bash
# بناء التطبيق للإنتاج
npm run build:prod

# إعداد تطبيق تليجرام
npm run setup:telegram

# معاينة النسخة المبنية
npm run preview
```

## إعداد تطبيق تليجرام

### 1. إنشاء البوت
```bash
# تحدث مع @BotFather على تليجرام
/newbot
# اتبع التعليمات واحصل على Bot Token
```

### 2. إعداد Mini App
```bash
# إعداد Web App URL
/setmenubutton
# اختر البوت
# أدخل URL: https://glamcall.com?tgWebAppPlatform=true
```

### 3. متغيرات البيئة
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_WEBHOOK_URL=https://glamcall.com/api/telegram/webhook
API_URL=https://glamcall.com/api
```

## SEO والتحسين

### الميزات المطبقة:
- ✅ **Meta Tags** محسنة لكل صفحة
- ✅ **Structured Data** (Schema.org)
- ✅ **Sitemap.xml** تلقائي
- ✅ **Robots.txt** محسن
- ✅ **Hreflang** للغات متعددة
- ✅ **Open Graph** و Twitter Cards
- ✅ **Canonical URLs**
- ✅ **Image Optimization**
- ✅ **Page Speed** محسن

### نصائح SEO:
1. استخدم عناوين وصفية لكل صفحة
2. اكتب وصف meta فريد لكل صفحة
3. استخدم الكلمات المفتاحية بشكل طبيعي
4. حسن سرعة التحميل
5. استخدم HTTPS دائماً
6. اجعل الموقع متجاوب مع الجوال

## الأمان والخصوصية

- 🔐 **تشفير شامل** - جميع البيانات مشفرة
- 🛡️ **Row Level Security** - حماية على مستوى قاعدة البيانات
- 🔑 **JWT Authentication** - مصادقة آمنة
- 🚫 **Rate Limiting** - منع الإساءة في الاستخدام
- 🛡️ **حماية الهوية** - عدم مشاركة المعلومات الشخصية
- 📱 **تحقق ثنائي** - أمان إضافي للحسابات
- 🚫 **مكافحة التحرش** - نظام إبلاغ فوري
- 💳 **مدفوعات آمنة** - معالجة مشفرة للمدفوعات

## نظام الترحيب للمستخدمين الجدد

- 🎉 **رسائل ترحيب تفاعلية** - تجربة إعداد سلسة
- 💡 **نصائح للبداية** - إرشادات مفيدة للاستخدام
- 🎁 **عروض خاصة** - مكافآت للأعضاء الجدد
- 💬 **رسائل من العارضات** - تفاعل فوري مع المجتمع

## النشر والاستضافة

### متطلبات الإنتاج:
- **Supabase Project** - قاعدة البيانات والمصادقة
- **Stripe Account** - معالجة المدفوعات
- **Cloudflare** - CDN وحماية
- **Domain & SSL** - نطاق مخصص وشهادة أمان

### خيارات النشر:
1. **Vercel** (موصى به)
2. **Netlify**
3. **AWS Amplify**
4. **Firebase Hosting**
5. **GitHub Pages**

### خطوات النشر على Vercel:
```bash
# تثبيت Vercel CLI
npm i -g vercel

# بناء المشروع
npm run build:prod

# النشر
vercel

# إعداد متغيرات البيئة
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_STRIPE_PUBLISHABLE_KEY
```

### النشر على Netlify:

#### الطريقة الأولى - Git Integration:
1. ادفع الكود إلى GitHub/GitLab
2. اربط المستودع بـ Netlify
3. اضبط متغيرات البيئة في Netlify Dashboard
4. النشر التلقائي عند كل push

#### الطريقة الثانية - Manual Deploy:
```bash
# بناء المشروع
npm run build:prod

# تثبيت Netlify CLI
npm install -g netlify-cli

# تسجيل الدخول
netlify login

# النشر
netlify deploy --prod --dir=dist
```

#### إعداد متغيرات البيئة في Netlify:
1. اذهب إلى Site Settings → Environment Variables
2. أضف المتغيرات التالية:
   - `VITE_SUPABASE_URL`: رابط مشروع Supabase
   - `VITE_SUPABASE_ANON_KEY`: مفتاح Supabase العام
   - `VITE_GA_MEASUREMENT_ID`: معرف Google Analytics (اختياري)
   - `VITE_APP_URL`: رابط التطبيق على Netlify

### إعداد النطاق المخصص:
1. اشتري نطاق مخصص (مثل glamcall.com)
2. في Netlify Dashboard، اذهب إلى Domain Settings
3. أضف النطاق المخصص
4. حدث DNS records عند مزود النطاق
5. SSL certificate سيتم تفعيله تلقائياً

### ميزات الإنتاج المضافة:
- ✅ **Service Worker** - للعمل دون اتصال
- ✅ **PWA Support** - تثبيت التطبيق على الأجهزة
- ✅ **Error Boundary** - معالجة الأخطاء بشكل أنيق
- ✅ **Performance Monitoring** - مراقبة الأداء
- ✅ **Offline Support** - دعم العمل بدون إنترنت
- ✅ **Security Headers** - حماية إضافية
- ✅ **Bundle Optimization** - تحسين حجم الملفات
- ✅ **Caching Strategy** - استراتيجية تخزين مؤقت

## الدعم الفني

- 📧 **دعم بالبريد الإلكتروني** - support@glamcall.com
- 💬 **Discord Server** - للمطورين والمساهمين
- 💬 **دردشة مباشرة** - متاح 24/7
- 📞 **دعم هاتفي** - للمساعدة الفورية
- 📚 **مركز المساعدة** - أسئلة شائعة ودلائل

## الترخيص

هذا المشروع محمي بحقوق الطبع والنشر. جميع الحقوق محفوظة.

## المساهمة

نرحب بالمساهمات! يرجى قراءة دليل المساهمة قبل تقديم أي تغييرات.

### إعداد بيئة التطوير:
1. Fork المشروع
2. استنسخ المشروع محلياً
3. أنشئ مشروع Supabase للتطوير
4. انسخ `.env.example` إلى `.env`
5. حدث متغيرات البيئة
6. شغل `npm run dev`

### خطوات المساهمة:
1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الترخيص والاستخدام التجاري

هذا المشروع مفتوح المصدر تحت رخصة MIT. يمكنك:
- ✅ الاستخدام التجاري
- ✅ التعديل والتطوير
- ✅ التوزيع
- ✅ الاستخدام الخاص

### متطلبات الترخيص:
- 📄 تضمين نص الترخيص
- 📄 ذكر المؤلف الأصلي

---

**GlamCall** - منصة المحادثات المرئية العالمية 🌟

*Production Ready • Database Integrated • Authentication System • Payment Processing • SEO Optimized • Multi-language • Telegram Ready*