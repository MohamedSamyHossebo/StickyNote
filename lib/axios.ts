import axios from "axios";
import Cookies from "js-cookie";

// 1. إعداد الـ Base URL مرة واحدة
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://your-api-domain.com/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. Request Interceptor (قبل ما الطلب يخرج)
// الوظيفة: تفتيش جيوب اليوزر (Cookies)، لو لقينا توكن نحطه في الهيدر
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token"); // قراءة التوكن من الكوكيز
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // الصيغة القياسية
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Response Interceptor (بعد ما الرد ييجي)
// الوظيفة: لو السيرفر قال "أنت مين؟" (401)، نمسح التوكن ونطرده
axiosInstance.interceptors.response.use(
    (response) => response, // لو نجح، رجع الرد زي ما هو
    (error) => {
        if (error.response && error.response.status === 401) {
            // التوكن غير صالح أو انتهى
            Cookies.remove("token");
            // توجيه لصفحة الدخول (استخدام window لأننا مش جوه React Component)
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;