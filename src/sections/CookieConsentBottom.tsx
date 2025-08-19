"use client";
import { useEffect, useState } from "react";

type CookiePreference = {
    analytics: boolean;
    marketing: boolean;
};

export default function CookieConsentBottom() {
    const [show, setShow] = useState(false);
    const [preferencesOpen, setPreferencesOpen] = useState(false);
    const [cookiePreference, setCookiePreference] = useState<CookiePreference>({
        analytics: false,
        marketing: false,
    });
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 0
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://db.onlinewebfonts.com/c/dbb1ae7135db652884e5f41bfe2dae37?family=Gesta+W01+Regular";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        const consent = localStorage?.getItem?.("cookieConsent");
        const pref = localStorage?.getItem?.("cookiePreferences");
        if (!consent) {
            setShow(true);
            document.body.style.overflow = "hidden";
        } else {
            setShow(false);
            document.body.style.overflow = "";
            if (consent === "accept") {
                enableAllCookies();
            } else if (consent === "decline") {
                disableNonEssentialCookies();
            } else if (consent === "preferences" && pref) {
                const preferences = JSON.parse(pref);
                setCookiePreference(preferences);
                applyPreferences(preferences);
            }
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleConsent = (value: string) => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("cookieConsent", value);
        }
        if (value === "accept") {
            enableAllCookies();
            setShow(false);
        } else if (value === "decline") {
            disableNonEssentialCookies();
            setShow(false);
        } else if (value === "preferences") {
            setPreferencesOpen(true);
            setShow(true);
            document.body.style.overflow = "hidden";
            return; // Don't immediately reset overflow here
        }
        document.body.style.overflow = "";
    };

    const enableAllCookies = () => {
        loadGoogleAnalytics();
        loadGoogleTagManager();
        updateGoogleConsent(true, true);
        console.log("All cookies enabled");
    };

    const disableNonEssentialCookies = () => {
        clearAnalyticsCookies();
        clearMarketingCookies();
        updateGoogleConsent(false, false);
        disableTrackingScripts();
        console.log("Non-essential cookies disabled");
    };

    const applyPreferences = (preferences: CookiePreference) => {
        if (preferences.analytics) {
            loadGoogleAnalytics();
            console.log("Analytics cookies enabled");
        } else {
            clearAnalyticsCookies();
            disableAnalyticsScripts();
            console.log("Analytics cookies disabled");
        }

        if (preferences.marketing) {
            loadGoogleTagManager();
            console.log("Marketing cookies enabled");
        } else {
            clearMarketingCookies();
            disableMarketingScripts();
            console.log("Marketing cookies disabled");
        }

        updateGoogleConsent(preferences.analytics, preferences.marketing);
    };

    const loadGoogleAnalytics = () => {
        const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
        if (!GA_ID) {
            console.warn("GA ID is missing");
            return;
        }
        if (document.querySelector(`script[src*="${GA_ID}"]`)) {
            return;
        }
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        script.onload = () => {
            (window as any).dataLayer = (window as any).dataLayer || [];
            function gtag(...args: any[]) {
                (window as any).dataLayer.push(args);
            }
            (window as any).gtag = gtag;

            gtag("js", new Date());
            gtag("config", GA_ID, {
                anonymize_ip: true,
                cookie_flags: "secure;samesite=lax",
                send_page_view: true,
            });

            console.log("Google Analytics loaded");
        };
        document.head.appendChild(script);
    };

    const loadGoogleTagManager = () => {
        const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
        if (!GTM_ID) {
            console.warn("GTM ID is missing");
            return;
        }
        if (document.querySelector(`script[src*="${GTM_ID}"]`)) {
            return;
        }
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js",
        });
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
        document.head.appendChild(script);

        console.log("Google Tag Manager loaded");
    };

    const updateGoogleConsent = (analytics: boolean, marketing: boolean) => {
        if ((window as any).gtag) {
            (window as any).gtag("consent", "update", {
                analytics_storage: analytics ? "granted" : "denied",
                ad_storage: marketing ? "granted" : "denied",
                ad_user_data: marketing ? "granted" : "denied",
                ad_personalization: marketing ? "granted" : "denied",
            });
            console.log("Google consent updated:", { analytics, marketing });
        } else {
            console.warn("gtag not available for consent update");
        }
    };

    const clearAnalyticsCookies = () => {
        const analyticsCookies = [
            "_ga",
            "_ga_",
            "_gid",
            "_gat",
            "_gtag_",
            "_gcl_au",
            "__utma",
            "__utmb",
            "__utmc",
            "__utmt",
            "__utmz",
            "__utmv",
        ];

        analyticsCookies.forEach((cookieName) => {
            deleteCookie(cookieName);
            deleteCookie(cookieName, window.location.hostname);
            deleteCookie(cookieName, "." + window.location.hostname);
        });

        try {
            Object.keys(localStorage).forEach((key) => {
                if (key.startsWith("_ga") || key.includes("analytics")) {
                    localStorage.removeItem(key);
                }
            });

            Object.keys(sessionStorage).forEach((key) => {
                if (key.startsWith("_ga") || key.includes("analytics")) {
                    sessionStorage.removeItem(key);
                }
            });
        } catch (e) {
            console.warn("Could not access browser storage:", e);
        }
    };

    const clearMarketingCookies = () => {
        const marketingCookies = [
            "_gcl_aw",
            "_gcl_dc",
            "_gcl_gb",
            "_gcl_gf",
            "_gcl_ha",
            "IDE",
            "test_cookie",
            "_gads",
            "_gac_",
            "DSID",
        ];

        marketingCookies.forEach((cookieName) => {
            deleteCookie(cookieName);
            deleteCookie(cookieName, window.location.hostname);
            deleteCookie(cookieName, "." + window.location.hostname);
        });
    };

    const deleteCookie = (name: string, domain?: string) => {
        const expires = "expires=Thu, 01 Jan 1970 00:00:01 GMT";
        const path = "path=/";
        const domainAttr = domain ? `domain=${domain}` : "";

        document.cookie = `${name}=; ${expires}; ${path}; ${domainAttr}`;
        document.cookie = `${name}=; ${expires}; ${path}; ${domainAttr}; secure`;
        document.cookie = `${name}=; ${expires}; ${path}; ${domainAttr}; samesite=lax`;
        document.cookie = `${name}=; ${expires}; ${path}; ${domainAttr}; secure; samesite=lax`;
    };

    const disableAnalyticsScripts = () => {
        const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
        if (GA_ID) {
            (window as any)[`ga-disable-${GA_ID}`] = true;
        }
        if ((window as any).dataLayer) {
            (window as any).dataLayer = [];
        }
        console.log("Analytics scripts disabled");
    };

    const disableMarketingScripts = () => {
        if ((window as any).google_tag_manager) {
            (window as any).google_tag_manager = {};
        }
        console.log("Marketing scripts disabled");
    };

    const disableTrackingScripts = () => {
        disableAnalyticsScripts();
        disableMarketingScripts();
        (window as any).doNotTrack = "1";
        console.log("All tracking disabled");
    };

    const savePreferences = () => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("cookieConsent", "preferences");
            localStorage.setItem("cookiePreferences", JSON.stringify(cookiePreference));
        }
        applyPreferences(cookiePreference);
        setPreferencesOpen(false);
        setShow(false);
        document.body.style.overflow = "";
    };

    if (!show) return null;

    const styles = {
        overlay: {
            position: "fixed" as const,
            zIndex: 10000,
            inset: 0,
            background: "rgba(6, 26, 64, 0.1)",
            backdropFilter: "blur(2px)",
        },
        modal: {
            position: "fixed" as const,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10001,
            background: "#FFFFFF",
            borderRadius: "16px 16px 0 0",
            boxShadow: "0 -8px 32px rgba(6, 26, 64, 0.15)",
            maxWidth: windowWidth > 600 ? 900 : "90vw",
            margin: "0 auto",
            padding: windowWidth > 600 ? "32px" : "16px",
            fontFamily: "Gesta W01 Regular",
            fontSize: windowWidth > 600 ? "16px" : "14px",
        },
        heading: {
            fontSize: windowWidth > 600 ? "24px" : "20px",
            fontWeight: "600",
            color: "#061A40",
            marginBottom: "16px",
            marginTop: 0,
        },
        text: {
            fontSize: windowWidth > 600 ? "16px" : "14px",
            lineHeight: "1.6",
            color: "#061A40",
            marginBottom: "24px",
            fontWeight: "400",
        },
        link: {
            color: "#007EA6",
            textDecoration: "underline",
            fontWeight: "500",
        },
        buttonContainer: {
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            flexWrap: "wrap" as const,
        },
        buttonPrimary: {
            background: "#061A40",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
        },
        buttonSecondary: {
            background: "#FFFFFF",
            color: "#061A40",
            border: "2px solid #EBEEF2",
            borderRadius: "8px",
            padding: "10px 22px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
        },
        buttonTeal: {
            background: "#007EA6",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
        },
        preferencesContainer: {
            background: "#EBEEF2",
            borderRadius: "12px",
            padding: windowWidth > 600 ? "24px" : "16px",
            marginBottom: "24px",
        },
        cookieCategory: {
            marginBottom: "20px",
            padding: "16px",
            background: "#FFFFFF",
            borderRadius: "8px",
            border: "1px solid #EBEEF2",
        },
        categoryTitle: {
            fontSize: "18px",
            fontWeight: "600",
            color: "#061A40",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
        },
        categoryDescription: {
            fontSize: "14px",
            color: "#061A40",
            opacity: 0.8,
            marginBottom: "12px",
            lineHeight: "1.5",
        },
        toggle: {
            position: "relative" as const,
            width: "50px",
            height: "24px",
            background: "#EBEEF2",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            border: "none",
            outline: "none",
        },
        toggleActive: {
            background: "#007EA6",
        },
        toggleCircle: {
            position: "absolute" as const,
            top: "2px",
            left: "2px",
            width: "20px",
            height: "20px",
            background: "#FFFFFF",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        toggleCircleActive: {
            transform: "translateX(26px)",
        },
        essentialBadge: {
            background: "#007EA6",
            color: "#FFFFFF",
            fontSize: "11px",
            fontWeight: "600",
            padding: "4px 8px",
            borderRadius: "12px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.5px",
        },
    };

    const ToggleSwitch = ({
        checked,
        onChange,
        disabled = false,
    }: {
        checked: boolean;
        onChange: (checked: boolean) => void;
        disabled?: boolean;
    }) => (
        <button
            style={{
                ...styles.toggle,
                ...(checked ? styles.toggleActive : {}),
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
            }}
            onClick={() => !disabled && onChange(!checked)}
            disabled={disabled}
            aria-pressed={checked}
            aria-label={checked ? "Toggle switch on" : "Toggle switch off"}
        >
            <div
                style={{
                    ...styles.toggleCircle,
                    ...(checked ? styles.toggleCircleActive : {}),
                }}
            />
        </button>
    );

    return (
        <>
            <div style={styles.overlay} tabIndex={-1} aria-hidden="true" />
            <div style={styles.modal} role="dialog" aria-modal="true" aria-labelledby="cookie-consent-heading">
                {!preferencesOpen ? (
                    <>
                        <h2 style={styles.heading} id="cookie-consent-heading">
                            Cookie Consent
                        </h2>
                        <p style={styles.text}>
                            We use essential cookies to make our site work. With your consent, we may also use
                            non-essential cookies to improve user experience and analyze website traffic. By
                            clicking “Accept,” you agree to our website's cookie use as described in our Cookie
                            Policy. You can change your cookie settings at any time by clicking “Preferences.”
                        </p>
                        <div style={styles.buttonContainer}>
                            <button
                                style={styles.buttonSecondary}
                                onClick={() => handleConsent("preferences")}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = "#007EA6";
                                    e.currentTarget.style.color = "#007EA6";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = "#EBEEF2";
                                    e.currentTarget.style.color = "#061A40";
                                }}
                            >
                                Manage Preferences
                            </button>
                            <button
                                style={styles.buttonSecondary}
                                onClick={() => handleConsent("decline")}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = "#061A40";
                                    e.currentTarget.style.background = "#EBEEF2";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = "#EBEEF2";
                                    e.currentTarget.style.background = "#FFFFFF";
                                }}
                            >
                                Decline All
                            </button>
                            <button
                                style={styles.buttonTeal}
                                onClick={() => handleConsent("accept")}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = "#006891";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = "#007EA6";
                                }}
                            >
                                Accept All
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 style={styles.heading}>Cookie Preferences</h2>
                        <p style={styles.text}>
                            Choose which cookies you want to allow. You can change these settings at any time.
                        </p>

                        <div style={styles.preferencesContainer}>
                            {/* Essential Cookies */}
                            <div style={styles.cookieCategory}>
                                <div style={styles.categoryTitle}>
                                    <span>Essential Cookies</span>
                                    <span style={styles.essentialBadge}>Always Active</span>
                                </div>
                                <p style={styles.categoryDescription}>
                                    These cookies are necessary for the website to function and cannot be switched
                                    off. They are usually set in response to actions made by you which amount to a
                                    request for services.
                                </p>
                                <ToggleSwitch checked={true} onChange={() => { }} disabled={true} />
                            </div>

                            {/* Analytics Cookies */}
                            <div style={styles.cookieCategory}>
                                <div style={styles.categoryTitle}>
                                    <span>Analytics Cookies</span>
                                </div>
                                <p style={styles.categoryDescription}>
                                    These cookies help us understand how visitors interact with our website by
                                    collecting and reporting information anonymously using Google Analytics. This helps
                                    us improve our website's performance.
                                </p>
                                <ToggleSwitch
                                    checked={cookiePreference.analytics}
                                    onChange={(checked) =>
                                        setCookiePreference({
                                            ...cookiePreference,
                                            analytics: checked,
                                        })
                                    }
                                />
                            </div>

                            {/* Marketing Cookies */}
                            <div style={styles.cookieCategory}>
                                <div style={styles.categoryTitle}>
                                    <span>Marketing Cookies</span>
                                </div>
                                <p style={styles.categoryDescription}>
                                    These cookies are used to track visitors across websites to display relevant
                                    advertisements and marketing campaigns that are more engaging for individual users.
                                </p>
                                <ToggleSwitch
                                    checked={cookiePreference.marketing}
                                    onChange={(checked) =>
                                        setCookiePreference({
                                            ...cookiePreference,
                                            marketing: checked,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div style={styles.buttonContainer}>
                            <button
                                style={styles.buttonSecondary}
                                onClick={() => {
                                    setPreferencesOpen(false);
                                    setShow(true);
                                    document.body.style.overflow = "hidden";
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = "#061A40";
                                    e.currentTarget.style.background = "#EBEEF2";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = "#EBEEF2";
                                    e.currentTarget.style.background = "#FFFFFF";
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                style={styles.buttonPrimary}
                                onClick={savePreferences}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = "#0A2354";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = "#061A40";
                                }}
                            >
                                Save Preferences
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
