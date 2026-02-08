import React, { useState, useRef, useEffect } from 'react';
import './valentine2.css';

const Valentine2 = () => {
    const [isPaid, setIsPaid] = useState(false);
    const [declineCount, setDeclineCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
    const [buttonScale, setButtonScale] = useState(1);
    const buttonRef = useRef(null);

    const handleAuthorize = () => {
        setIsPaid(true);
        setTimeout(() => {
            window.location.href = '/movies';
        }, 2000);
    };

    const handleDecline = () => {
        setDeclineCount(prev => prev + 1);
        const errors = [
            "ERROR: TRANSACTION MANDATORY",
            "DECLINED: INSUFFICIENT WILLPOWER",
            "SYSTEM: OPTION DISABLED BY ADMIN",
            "ERROR: HEART.EXE NOT FOUND",
            "WARNING: CUTE AGGRESSION IMMINENT",
            "TRY AGAIN... OR ELSE :)"
        ];
        setErrorMsg(errors[declineCount % errors.length]);
    };

    const handleMouseMove = (e) => {
        if (!buttonRef.current || isPaid) return;

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();

        // Button center is already where the button visually is (transform is applied)
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
            Math.pow(e.clientX - buttonCenterX, 2) +
            Math.pow(e.clientY - buttonCenterY, 2)
        );

        // Shrink when getting close (within 200px)
        if (distance < 200) {
            const scale = Math.max(0.4, distance / 200);
            setButtonScale(scale);

            // Run away when very close (within 100px)
            if (distance < 100) {
                const angle = Math.atan2(buttonCenterY - e.clientY, buttonCenterX - e.clientX);
                const moveDistance = 80 + Math.random() * 40;

                setButtonPos(prev => {
                    const newX = prev.x + Math.cos(angle) * moveDistance;
                    const newY = prev.y + Math.sin(angle) * moveDistance;

                    // Keep within page bounds (can go sideways but limited up/down)
                    const maxX = 300;
                    const maxY = 80;
                    return {
                        x: Math.max(-maxX, Math.min(maxX, newX)),
                        y: Math.max(-100, Math.min(maxY, newY))
                    };
                });
            }
        } else {
            setButtonScale(1);
        }
    };

    useEffect(() => {
        const throttledHandler = (e) => handleMouseMove(e);
        window.addEventListener('mousemove', throttledHandler);
        return () => window.removeEventListener('mousemove', throttledHandler);
    });

    return (
        <div className="valentine2-container">
            <div className="receipt-card">
                <div className="receipt-header">
                    <h2>RECEIPT</h2>
                    <div className="receipt-bg-text">ORD #1402 • AUTH: LOVE-2026</div>
                    <div className="date-time">
                        <span>{new Date().toLocaleDateString()}</span>
                        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>

                <div className="receipt-body">
                    <div className="receipt-item">
                        <span className="item-name">1x ASK FOR PHOTOS</span>
                        <span className="item-price">$0.00</span>
                    </div>
                    <div className="receipt-item">
                        <span className="item-name">1x BEING A THAATHA</span>
                        <span className="item-price">$0.00</span>
                    </div>
                    <div className="receipt-item">
                        <span className="item-name">1x KEEPING U UP (BEDTIME)</span>
                        <span className="item-price">$0.00</span>
                    </div>
                    <div className="receipt-item">
                        <span className="item-name">1x YAPPING</span>
                        <span className="item-price">$0.00</span>
                    </div>
                    <div className="receipt-item">
                        <span className="item-name">1x LICKING YOUR FACE</span>
                        <span className="item-price">$0.00</span>
                    </div>
                    <div className="receipt-item">
                        <span className="item-name">1x MAKING U LAUGH ALWAYS</span>
                        <span className="item-price">$0.00</span>
                    </div>
                    <div className="receipt-item">
                        <span className="item-name">1x HYPING U UP</span>
                        <span className="item-price">$0.00</span>
                    </div>
                    <div className="receipt-item">
                        <span className="item-name">1x FACETIME SLEEPOVERS</span>
                        <span className="item-price">$0.00</span>
                    </div>
                    <div className="receipt-item">
                        <span className="item-name">1x PLANE TICKET MANIFESTING</span>
                        <span className="item-price">$0.00</span>
                    </div>

                    <div className="receipt-item total">
                        <span className="item-name">TOTAL</span>
                        <span className="item-price">PRICELESS</span>
                    </div>
                </div>

                {!isPaid ? (
                    <div className="receipt-footer">
                        <p>AUTHORIZE TRANSACTION?</p>
                        <div className="action-buttons">
                            <button className="auth-btn" onClick={handleAuthorize}>
                                ✅ CONFIRM TRANSACTION
                            </button>
                            <button
                                ref={buttonRef}
                                className="decline-btn"
                                onClick={handleDecline}
                                style={{
                                    transform: `translate(${buttonPos.x}px, ${buttonPos.y}px) scale(${buttonScale})`,
                                    transition: 'transform 0.15s ease-out'
                                }}
                            >
                                DECLINE
                            </button>
                        </div>
                        {errorMsg && <div className="error-message">{errorMsg}</div>}
                    </div>
                ) : (
                    <div className="receipt-footer">
                        <div className="success-message">
                            <p>TRANSACTION APPROVED ❤️</p>
                        </div>
                        <div className="barcode">||||| |||| || |||||</div>
                    </div>
                )}
            </div>

            {isPaid && <div className="approved-stamp">APPROVED</div>}
        </div>
    );
};

export default Valentine2;
