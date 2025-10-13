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
        const consent = localStorage?.getItem?.("cookieConsent");
        const pref = localStorage?.getItem?.("cookiePreferences");
        if (!consent) {
            setShow(true);
            document.body.style.overflow = "hidden";
        } else {
            setShow(false);
            document.body.style.overflow = "";
            if (consent === "preferences" && pref) {
                const preferences = JSON.parse(pref);
                setCookiePreference(preferences);
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
            setCookiePreference({ analytics: true, marketing: true });
            setShow(false);
        } else if (value === "decline") {
            setCookiePreference({ analytics: false, marketing: false });
            setShow(false);
        } else if (value === "preferences") {
            setPreferencesOpen(true);
            setShow(true);
            document.body.style.overflow = "hidden";
            return;
        }
        document.body.style.overflow = "";
    };

    const savePreferences = () => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("cookieConsent", "preferences");
            localStorage.setItem("cookiePreferences", JSON.stringify(cookiePreference));
        }
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
            position: "fixed" as "fixed",
            bottom: "20px",
            zIndex: 10001,
            background: "#FFFFFF",
            borderRadius: "16px 16px 0 0",
            boxShadow: "0 -8px 32px rgba(6, 26, 64, 0.15)",
            padding: windowWidth > 600 ? "24px 32px 0" : "16px 16px 0",
            fontFamily: "Gesta W01 Regular" as string,
            fontSize: windowWidth > 600 ? "16px" : "14px",
            width: "99vw",
            boxSizing: "border-box" as "border-box",
            left: "50%",
            transform: "translateX(-50%)",
        },
        heading: {
            fontSize: windowWidth > 600 ? "26px" : "22px",
            fontWeight: "600",
            color: "#061A40",
            marginBottom: "12px",
            marginTop: 0,
        },
        text: {
            fontSize: windowWidth > 600 ? "26px" : "22px",
            lineHeight: "1.5",
            color: "#061A40",
            marginBottom: "20px",
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
            marginTop: "16px",
            paddingBottom: "24px",
        },
        buttonPrimary: {
            background: "#061A40",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
        },
        buttonSecondary: {
            background: "#FFFFFF",
            color: "#061A40",
            border: "2px solid #EBEEF2",
            borderRadius: "8px",
            padding: "8px 18px",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
        },
        buttonTeal: {
            background: "#007EA6",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "inherit",
        },
        preferencesContainer: {
            background: "#EBEEF2",
            borderRadius: "12px",
            padding: windowWidth > 600 ? "20px" : "16px",
            marginBottom: "20px",
        },
        cookieCategory: {
            marginBottom: "16px",
            padding: "16px",
            background: "#FFFFFF",
            borderRadius: "8px",
            border: "1px solid #EBEEF2",
        },
        categoryTitle: {
            fontSize: "16px",
            fontWeight: "600",
            color: "#061A40",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
        },
        categoryDescription: {
            fontSize: "13px",
            color: "#061A40",
            opacity: 0.8,
            marginBottom: "10px",
            lineHeight: "1.4",
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
            fontSize: "10px",
            fontWeight: "600",
            padding: "3px 6px",
            borderRadius: "10px",
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
                            clicking "Accept," you agree to our website's cookie use as described in our Cookie
                            Policy. You can change your cookie settings at any time by clicking "Preferences."
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
                                    collecting and reporting information anonymously. This helps us improve our
                                    website's performance.
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
