const translations = {
    uz: {
        "nav-home": "Bosh sahifa",
        "nav-categories": "Kategoriyalar",
        "nav-regions": "Hududlar",
        "nav-chat": "Chat",
        "nav-account": "Kabinet",
        "settings-title": "Sozlamalar",
        "settings-profile": "Profil",
        "settings-notifications": "Bildirishnomalar",
        "settings-language": "Til",
        "settings-privacy": "Maxfiylik",
        "settings-account-security": "Hisob",
        "settings-extra": "Qo'shimcha",
        "profile-settings-title": "Profil Sozlamalari",
        "profile-settings-desc": "Shaxsiy ma'lumotlaringizni boshqaring va yangilang.",
        "label-name": "Foydalanuvchi ismi",
        "label-phone": "Telefon raqam",
        "label-email": "Email manzil",
        "label-old-password": "Eski parol",
        "label-new-password": "Yangi parol",
        "label-confirm-password": "Parolni takrorlang",
        "portfolio-title": "Qilingan ishlarni rasmini taylash",
        "portfolio-desc": "Eng yaxshi ishlarigizdan kamida 3-5 ta rasm yuklang.",
        "btn-save": "Saqlash",
        "btn-upload-photo": "Rasm yuklash",
        "btn-add-photo": "Rasm qo'shish",
        "lang-title": "Til",
        "lang-desc": "Ilova tilini tanlang.",
        "label-select-lang": "Til tanlang",
        "logout": "Chiqish",
        "edit-profile": "Ma'lumotlarni tahrirlash",
        "my-account": "Mening akkauntim",
        "worker-badge": "Usta",
        "customer-badge": "Mijoz",
        "registratsiya": "Usta sifatida ro'yxatdan o'tish",
        "header-main-title": "Mukammal xizmat uchun eng yaxshi ustalarni tanlang",
        "header-subtitle": "Sizga mos ustani topish endi yanada oson.",
        "help": "Yordam",
        "back": "Orqaga"
    },
    ru: {
        "nav-home": "Главная",
        "nav-categories": "Категории",
        "nav-regions": "Регионы",
        "nav-chat": "Чат",
        "nav-account": "Кабинет",
        "settings-title": "Настройки",
        "settings-profile": "Профиль",
        "settings-notifications": "Уведомления",
        "settings-language": "Язык",
        "settings-privacy": "Конфиденциальность",
        "settings-account-security": "Аккаунт",
        "settings-extra": "Дополнительно",
        "profile-settings-title": "Настройки профиля",
        "profile-settings-desc": "Управляйте своими личными данными.",
        "label-name": "Имя пользователя",
        "label-phone": "Номер телефона",
        "label-email": "Email адрес",
        "label-old-password": "Старый пароль",
        "label-new-password": "Новый пароль",
        "label-confirm-password": "Повторите пароль",
        "portfolio-title": "Загрузить примеры работ",
        "portfolio-desc": "Загрузите минимум 3-5 фотографий ваших лучших работ.",
        "btn-save": "Сохранить",
        "btn-upload-photo": "Загрузить фото",
        "btn-add-photo": "Добавить фото",
        "lang-title": "Язык",
        "lang-desc": "Выберите язык приложения.",
        "label-select-lang": "Выберите язык",
        "logout": "Выйти",
        "edit-profile": "Редактировать данные",
        "my-account": "Мой аккаунт",
        "worker-badge": "Мастер",
        "customer-badge": "Клиент",
        "registratsiya": "Зарегистрироваться как мастер",
        "header-main-title": "Выберите лучших мастеров для идеального сервиса",
        "header-subtitle": "Найти подходящего мастера теперь еще проще.",
        "help": "Помощь",
        "back": "Назад"
    },
    en: {
        "nav-home": "Home",
        "nav-categories": "Categories",
        "nav-regions": "Regions",
        "nav-chat": "Chat",
        "nav-account": "Account",
        "settings-title": "Settings",
        "settings-profile": "Profile",
        "settings-notifications": "Notifications",
        "settings-language": "Language",
        "settings-privacy": "Privacy",
        "settings-account-security": "Account",
        "settings-extra": "Extra",
        "profile-settings-title": "Profile Settings",
        "profile-settings-desc": "Manage and update your personal information.",
        "label-name": "Username",
        "label-phone": "Phone number",
        "label-email": "Email address",
        "label-old-password": "Old password",
        "label-new-password": "New password",
        "label-confirm-password": "Confirm password",
        "portfolio-title": "Upload portfolio images",
        "portfolio-desc": "Upload at least 3-5 photos of your best work.",
        "btn-save": "Save",
        "btn-upload-photo": "Upload photo",
        "btn-add-photo": "Add photo",
        "lang-title": "Language",
        "lang-desc": "Choose application language.",
        "label-select-lang": "Select language",
        "logout": "Logout",
        "edit-profile": "Edit info",
        "my-account": "My Account",
        "worker-badge": "Artisan",
        "customer-badge": "Customer",
        "registratsiya": "Register as an Artisan",
        "header-main-title": "Choose the best artisans for perfect service",
        "header-subtitle": "Finding the right artisan is now even easier.",
        "help": "Help",
        "back": "Back"
    }
};

function applyTranslations() {
    const lang = localStorage.getItem('ustatop_lang') || 'uz';
    const dict = translations[lang];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'password' || el.type === 'email')) {
                el.placeholder = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });

    // Update document title if needed
    if (dict['settings-title'] && window.location.pathname.includes('sozlamalar')) {
        document.title = `${dict['settings-title']} | UstaTop`;
    }
}

function setLanguage(lang) {
    localStorage.setItem('ustatop_lang', lang);
    applyTranslations();
    // Special case for settings page to update dropdown
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) langSelect.value = lang;
}

// Auto-apply on load
document.addEventListener('DOMContentLoaded', applyTranslations);
