export const GA_TRACKING_ID = "G-52R3J5ZQW2"; // Replace with your GA ID

// Track Page Views
export const pageview = (url) => {
    window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
};
