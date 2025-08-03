export const welcomeMessages = [
  {
    id: '1',
    type: 'welcome',
    title: 'مرحباً بك في GlamCall! 🌟',
    message: 'أهلاً وسهلاً بك في منصة GlamCall الرائدة للمحادثات المرئية. نحن سعداء لانضمامك إلينا!',
    sender: 'فريق GlamCall',
    avatar: '/logo-avatar.png'
  },
  {
    id: '2',
    type: 'tips',
    title: 'نصائح للبداية 💡',
    message: 'للحصول على أفضل تجربة، ننصحك بإكمال ملفك الشخصي وإضافة صورة واضحة. كما يمكنك تصفح العارضات المتاحات والبدء بمحادثة مجانية!',
    sender: 'مساعد GlamCall',
    avatar: '/assistant-avatar.png'
  },
  {
    id: '3',
    type: 'promotion',
    title: 'عرض خاص للأعضاء الجدد! 🎁',
    message: 'احصل على 50 عملة مجانية عند أول عملية شراء! استخدم الكود: WELCOME50',
    sender: 'قسم العروض',
    avatar: '/promo-avatar.png'
  },
  {
    id: '4',
    type: 'safety',
    title: 'الأمان أولاً 🛡️',
    message: 'نحن نهتم بأمانك وخصوصيتك. جميع المحادثات مشفرة ومحمية. لا تتردد في الإبلاغ عن أي سلوك غير لائق.',
    sender: 'فريق الأمان',
    avatar: '/security-avatar.png'
  }
];

export const modelWelcomeMessages = [
  {
    id: 'm-1',
    modelId: 'ar-1',
    message: 'مرحباً عزيزي! أنا نورا من الرياض 🌹 أحب التحدث عن الثقافة والفن. هل تود أن نتحدث؟',
    timestamp: new Date(Date.now() - 300000).toISOString()
  },
  {
    id: 'm-2',
    modelId: 'ar-4',
    message: 'أهلاً وسهلاً! أنا ريما من بيروت 🎵 أحب الموسيقى والشعر. ما رأيك أن نتشارك بعض الأحاديث الجميلة؟',
    timestamp: new Date(Date.now() - 600000).toISOString()
  },
  {
    id: 'm-3',
    modelId: 'ar-9',
    message: 'السلام عليكم! أنا مريم من بغداد 📚 أحب التاريخ والثقافة. يسعدني التحدث معك عن أي موضوع يهمك!',
    timestamp: new Date(Date.now() - 900000).toISOString()
  }
];