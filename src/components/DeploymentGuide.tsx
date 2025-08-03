import React from 'react';
import { Server, Globe, Shield, Zap, Database, Cloud } from 'lucide-react';

export const DeploymentGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-gold bg-clip-text text-transparent mb-4">
            دليل النشر الاحترافي
          </h1>
          <p className="text-gray-400 text-lg">خطوات تحويل GlamCall إلى تطبيق إنتاج حقيقي</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Backend Infrastructure */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Server className="w-8 h-8 text-blue-400" />
              <h2 className="text-xl font-bold text-white">البنية التحتية للخادم</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>• <strong>Node.js/Express</strong> - API الخلفي</li>
              <li>• <strong>Socket.io</strong> - المحادثات المباشرة</li>
              <li>• <strong>WebRTC</strong> - المكالمات المرئية</li>
              <li>• <strong>Redis</strong> - التخزين المؤقت</li>
              <li>• <strong>Nginx</strong> - موازن الأحمال</li>
              <li>• <strong>PM2</strong> - إدارة العمليات</li>
            </ul>
          </div>

          {/* Database */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-8 h-8 text-green-400" />
              <h2 className="text-xl font-bold text-white">قاعدة البيانات</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>• <strong>PostgreSQL</strong> - البيانات الرئيسية</li>
              <li>• <strong>MongoDB</strong> - الرسائل والجلسات</li>
              <li>• <strong>Elasticsearch</strong> - البحث المتقدم</li>
              <li>• <strong>InfluxDB</strong> - الإحصائيات</li>
              <li>• <strong>Backup Strategy</strong> - نسخ احتياطية</li>
            </ul>
          </div>

          {/* Security */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-red-400" />
              <h2 className="text-xl font-bold text-white">الأمان والحماية</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>• <strong>JWT Authentication</strong> - المصادقة</li>
              <li>• <strong>OAuth 2.0</strong> - تسجيل الدخول الاجتماعي</li>
              <li>• <strong>Rate Limiting</strong> - منع الإساءة</li>
              <li>• <strong>SSL/TLS</strong> - التشفير</li>
              <li>• <strong>GDPR Compliance</strong> - حماية البيانات</li>
              <li>• <strong>Content Moderation</strong> - مراقبة المحتوى</li>
            </ul>
          </div>

          {/* Payment Integration */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">أنظمة الدفع</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>• <strong>Stripe</strong> - البطاقات الائتمانية</li>
              <li>• <strong>PayPal</strong> - المحافظ الرقمية</li>
              <li>• <strong>Apple Pay/Google Pay</strong> - الدفع السريع</li>
              <li>• <strong>Cryptocurrency</strong> - العملات الرقمية</li>
              <li>• <strong>Local Payment Methods</strong> - طرق محلية</li>
            </ul>
          </div>

          {/* Cloud Services */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Cloud className="w-8 h-8 text-purple-400" />
              <h2 className="text-xl font-bold text-white">الخدمات السحابية</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>• <strong>AWS/Azure/GCP</strong> - الاستضافة</li>
              <li>• <strong>Cloudflare</strong> - CDN وحماية</li>
              <li>• <strong>Agora.io</strong> - المكالمات المرئية</li>
              <li>• <strong>SendGrid</strong> - البريد الإلكتروني</li>
              <li>• <strong>Twilio</strong> - الرسائل النصية</li>
              <li>• <strong>Firebase</strong> - الإشعارات</li>
            </ul>
          </div>

          {/* Monitoring */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-8 h-8 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">المراقبة والتحليلات</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>• <strong>Google Analytics</strong> - تحليل المستخدمين</li>
              <li>• <strong>Sentry</strong> - مراقبة الأخطاء</li>
              <li>• <strong>DataDog</strong> - مراقبة الأداء</li>
              <li>• <strong>LogRocket</strong> - جلسات المستخدمين</li>
              <li>• <strong>Mixpanel</strong> - تحليل الأحداث</li>
            </ul>
          </div>
        </div>

        {/* Deployment Steps */}
        <div className="mt-12 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">خطوات النشر</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">المرحلة الأولى - التطوير</h3>
              <ol className="space-y-2 text-gray-300 text-sm">
                <li>1. إعداد البيئة التطويرية</li>
                <li>2. تطوير API الخلفي</li>
                <li>3. تكامل قاعدة البيانات</li>
                <li>4. تطبيق أنظمة الأمان</li>
                <li>5. اختبار الوحدة والتكامل</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">المرحلة الثانية - النشر</h3>
              <ol className="space-y-2 text-gray-300 text-sm">
                <li>1. إعداد الخوادم السحابية</li>
                <li>2. تكوين أنظمة المراقبة</li>
                <li>3. تطبيق SSL وأمان الشبكة</li>
                <li>4. اختبار الأداء والحمولة</li>
                <li>5. الإطلاق التدريجي</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Cost Estimation */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">تقدير التكاليف الشهرية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">$500-1000</div>
              <div className="text-gray-400 text-sm">البنية التحتية</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">$200-500</div>
              <div className="text-gray-400 text-sm">الخدمات الخارجية</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">$300-800</div>
              <div className="text-gray-400 text-sm">المراقبة والأمان</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};