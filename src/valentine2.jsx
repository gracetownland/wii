import React, { useState } from 'react';
import './valentine2.css';

const Valentine2 = () => {
    const [isPaid, setIsPaid] = useState(false);
    const [declineCount, setDeclineCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    const handleAuthorize = () => {
        setIsPaid(true);
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
        // Cycle through errors or pick random
        setErrorMsg(errors[declineCount % errors.length]);
    };

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
                        <span className="item-name">TOTAL (CLICK BELOW)</span>
                        <span className="item-price">YES</span>
                    </div>

                    <div className="receipt-item date-link">
                        <a href="/movies" className="movie-link">➡️ 1x VALENTINE DATE (SELECT MOVIE)</a>
                    </div>
                </div>

                {!isPaid ? (
                    <div className="receipt-footer">
                        <p>AUTHORIZE TRANSACTION?</p>
                        <div className="action-buttons">
                            <button className="auth-btn" onClick={handleAuthorize}>
                                AUTHORIZE (YES)
                            </button>
                            <button className="decline-btn" onClick={handleDecline}>
                                DECLINE (NO)
                            </button>
                        </div>
                        {errorMsg && <div className="error-message">{errorMsg}</div>}
                    </div>
                ) : (
                    <div className="receipt-footer">
                        <div className="success-message">
                            <p>TRANSACTION APPROVED</p>
                            <p>See you on the 14th! ❤️</p>
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
