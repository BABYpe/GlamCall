import { Model } from '../types';

export const arabicModels: Model[] = [
  // المملكة العربية السعودية
  {
    id: 'ar-1',
    name: 'نورا الأحمد',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'السعودية',
    language: 'العربية، الإنجليزية',
    rating: 4.9,
    reviewCount: 342,
    isOnline: true,
    pricePerMinute: 4.50,
    description: 'عارضة أزياء من الرياض، أحب الفن والثقافة العربية الأصيلة. متخصصة في المحادثات الثقافية والترفيهية.',
    tags: ['الأزياء', 'الثقافة العربية', 'الفن', 'الموسيقى'],
    totalMinutes: 2150
  },
  {
    id: 'ar-2',
    name: 'ليلى المصري',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'مصر',
    language: 'العربية، الإنجليزية، الفرنسية',
    rating: 4.8,
    reviewCount: 298,
    isOnline: false,
    pricePerMinute: 3.80,
    description: 'ممثلة ومقدمة برامج من القاهرة. أحب مناقشة السينما والأدب العربي والتاريخ المصري العريق.',
    tags: ['السينما', 'الأدب', 'التاريخ', 'الثقافة المصرية'],
    totalMinutes: 1890
  },
  // الإمارات العربية المتحدة
  {
    id: 'ar-3',
    name: 'فاطمة الزهراء',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'الإمارات',
    language: 'العربية، الإنجليزية، الهندية',
    rating: 4.7,
    reviewCount: 256,
    isOnline: true,
    pricePerMinute: 5.20,
    description: 'رائدة أعمال من دبي، متخصصة في التجارة والأعمال. أحب مناقشة ريادة الأعمال والتطوير الشخصي.',
    tags: ['ريادة الأعمال', 'التجارة', 'التطوير الشخصي', 'التكنولوجيا'],
    totalMinutes: 1650
  },
  // لبنان
  {
    id: 'ar-4',
    name: 'ريما حداد',
    avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'لبنان',
    language: 'العربية، الإنجليزية، الفرنسية',
    rating: 4.9,
    reviewCount: 412,
    isOnline: true,
    pricePerMinute: 4.20,
    description: 'مغنية وموسيقية من بيروت. أحب الموسيقى العربية الكلاسيكية والحديثة، والشعر العربي.',
    tags: ['الموسيقى', 'الغناء', 'الشعر', 'الفن اللبناني'],
    totalMinutes: 2340
  },
  // الأردن
  {
    id: 'ar-5',
    name: 'سارة العبدالله',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'الأردن',
    language: 'العربية، الإنجليزية',
    rating: 4.6,
    reviewCount: 189,
    isOnline: false,
    pricePerMinute: 3.50,
    description: 'مهندسة معمارية من عمان، أحب التصميم والفن المعماري الإسلامي والحديث.',
    tags: ['الهندسة المعمارية', 'التصميم', 'الفن الإسلامي', 'التراث'],
    totalMinutes: 1120
  },
  // المغرب
  {
    id: 'ar-6',
    name: 'أمينة بنعلي',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'المغرب',
    language: 'العربية، الفرنسية، الأمازيغية',
    rating: 4.8,
    reviewCount: 267,
    isOnline: true,
    pricePerMinute: 3.90,
    description: 'فنانة تشكيلية من الرباط، متخصصة في الفن المغربي التقليدي والمعاصر.',
    tags: ['الفن التشكيلي', 'التراث المغربي', 'الثقافة الأمازيغية', 'الحرف اليدوية'],
    totalMinutes: 1780
  },
  // تونس
  {
    id: 'ar-7',
    name: 'زينب التونسي',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'تونس',
    language: 'العربية، الفرنسية، الإنجليزية',
    rating: 4.7,
    reviewCount: 203,
    isOnline: true,
    pricePerMinute: 3.60,
    description: 'كاتبة وصحفية من تونس العاصمة، أحب الأدب العربي والفلسفة والتاريخ الإسلامي.',
    tags: ['الأدب', 'الصحافة', 'الفلسفة', 'التاريخ الإسلامي'],
    totalMinutes: 1450
  },
  // الجزائر
  {
    id: 'ar-8',
    name: 'خديجة بوعلام',
    avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'الجزائر',
    language: 'العربية، الفرنسية، الأمازيغية',
    rating: 4.5,
    reviewCount: 156,
    isOnline: false,
    pricePerMinute: 3.40,
    description: 'طبيبة ومتطوعة من الجزائر العاصمة، أحب مساعدة الآخرين ومناقشة القضايا الاجتماعية.',
    tags: ['الطب', 'العمل التطوعي', 'القضايا الاجتماعية', 'التنمية'],
    totalMinutes: 980
  },
  // العراق
  {
    id: 'ar-9',
    name: 'مريم البغدادي',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'العراق',
    language: 'العربية، الإنجليزية، الكردية',
    rating: 4.8,
    reviewCount: 234,
    isOnline: true,
    pricePerMinute: 3.70,
    description: 'مؤرخة وباحثة من بغداد، متخصصة في التاريخ العراقي والحضارة الإسلامية.',
    tags: ['التاريخ', 'الحضارة الإسلامية', 'الآثار', 'البحث العلمي'],
    totalMinutes: 1670
  },
  // سوريا
  {
    id: 'ar-10',
    name: 'ياسمين الشامي',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'سوريا',
    language: 'العربية، الإنجليزية، التركية',
    rating: 4.9,
    reviewCount: 289,
    isOnline: true,
    pricePerMinute: 3.80,
    description: 'شاعرة وأديبة من دمشق، أحب الشعر العربي الكلاسيكي والحديث والأدب الشامي.',
    tags: ['الشعر', 'الأدب', 'الثقافة الشامية', 'الكتابة الإبداعية'],
    totalMinutes: 2010
  },
  // فلسطين
  {
    id: 'ar-11',
    name: 'رنا القدسي',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'فلسطين',
    language: 'العربية، الإنجليزية، العبرية',
    rating: 4.7,
    reviewCount: 198,
    isOnline: false,
    pricePerMinute: 3.60,
    description: 'فنانة ونشطة ثقافية من القدس، أحب الفن الفلسطيني التراثي والمعاصر.',
    tags: ['الفن الفلسطيني', 'التراث', 'النشاط الثقافي', 'التطريز'],
    totalMinutes: 1340
  },
  // الكويت
  {
    id: 'ar-12',
    name: 'دانة الصباح',
    avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'الكويت',
    language: 'العربية، الإنجليزية، الفارسية',
    rating: 4.6,
    reviewCount: 167,
    isOnline: true,
    pricePerMinute: 4.10,
    description: 'مصممة أزياء من الكويت، متخصصة في الأزياء الخليجية التراثية والعصرية.',
    tags: ['تصميم الأزياء', 'التراث الخليجي', 'الموضة', 'الأناقة'],
    totalMinutes: 1230
  },
  // البحرين
  {
    id: 'ar-13',
    name: 'شيخة آل خليفة',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'البحرين',
    language: 'العربية، الإنجليزية، الهندية',
    rating: 4.8,
    reviewCount: 145,
    isOnline: true,
    pricePerMinute: 4.30,
    description: 'خبيرة في اللؤلؤ والمجوهرات من المنامة، أحب التراث البحريني وصناعة اللؤلؤ.',
    tags: ['اللؤلؤ', 'المجوهرات', 'التراث البحريني', 'الحرف التقليدية'],
    totalMinutes: 1090
  },
  // قطر
  {
    id: 'ar-14',
    name: 'عائشة الثاني',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'قطر',
    language: 'العربية، الإنجليزية، الفرنسية',
    rating: 4.9,
    reviewCount: 178,
    isOnline: false,
    pricePerMinute: 4.80,
    description: 'مهندسة بترول من الدوحة، أحب التكنولوجيا والابتكار في مجال الطاقة.',
    tags: ['هندسة البترول', 'التكنولوجيا', 'الطاقة', 'الابتكار'],
    totalMinutes: 1420
  },
  // عُمان
  {
    id: 'ar-15',
    name: 'بدرية العمانية',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'عُمان',
    language: 'العربية، الإنجليزية، السواحيلية',
    rating: 4.7,
    reviewCount: 134,
    isOnline: true,
    pricePerMinute: 3.90,
    description: 'باحثة في التراث العماني من مسقط، أحب الثقافة العمانية والتاريخ البحري.',
    tags: ['التراث العماني', 'التاريخ البحري', 'الثقافة', 'البحث'],
    totalMinutes: 1180
  },
  // اليمن
  {
    id: 'ar-16',
    name: 'هدى اليمانية',
    avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'اليمن',
    language: 'العربية، الإنجليزية',
    rating: 4.5,
    reviewCount: 98,
    isOnline: false,
    pricePerMinute: 3.20,
    description: 'معلمة وكاتبة من صنعاء، أحب التعليم والأدب اليمني والشعر النبطي.',
    tags: ['التعليم', 'الأدب اليمني', 'الشعر النبطي', 'التراث'],
    totalMinutes: 890
  },
  // السودان
  {
    id: 'ar-17',
    name: 'آمال السودانية',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'السودان',
    language: 'العربية، الإنجليزية، النوبية',
    rating: 4.6,
    reviewCount: 123,
    isOnline: true,
    pricePerMinute: 3.30,
    description: 'طبيبة أطفال من الخرطوم، أحب العمل الإنساني والثقافة السودانية المتنوعة.',
    tags: ['طب الأطفال', 'العمل الإنساني', 'الثقافة السودانية', 'التنوع'],
    totalMinutes: 1050
  },
  // ليبيا
  {
    id: 'ar-18',
    name: 'سلمى الليبية',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    country: 'ليبيا',
    language: 'العربية، الإنجليزية، الإيطالية',
    rating: 4.4,
    reviewCount: 87,
    isOnline: true,
    pricePerMinute: 3.50,
    description: 'مهندسة مدنية من طرابلس، أحب العمارة الليبية التقليدية والتطوير العمراني.',
    tags: ['الهندسة المدنية', 'العمارة الليبية', 'التطوير العمراني', 'التراث'],
    totalMinutes: 760
  }
];