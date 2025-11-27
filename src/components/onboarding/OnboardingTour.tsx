'use client';

import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export function OnboardingTour() {
    const [hasSeenTour, setHasSeenTour] = useState(true); // Default to true to avoid flash

    useEffect(() => {
        // Check if user has seen tour
        const seen = localStorage.getItem('cliptune_tour_seen');
        if (!seen) {
            setHasSeenTour(false);
        }
    }, []);

    useEffect(() => {
        if (!hasSeenTour) {
            const driverObj = driver({
                showProgress: true,
                steps: [
                    {
                        element: '#editor-upload-area',
                        popover: {
                            title: 'Upload Your Video',
                            description: 'Start by uploading a long-form video here. We support MP4, MOV, and AVI.',
                            side: 'bottom',
                            align: 'start'
                        }
                    },
                    {
                        element: '#timeline-container',
                        popover: {
                            title: 'The Timeline',
                            description: 'This is where the magic happens. Review AI-generated clips and fine-tune them.',
                            side: 'top',
                            align: 'start'
                        }
                    },
                    {
                        element: '#export-button',
                        popover: {
                            title: 'Export Clips',
                            description: 'Once you are happy with your clips, click here to export them.',
                            side: 'left',
                            align: 'start'
                        }
                    }
                ],
                onDestroyStarted: () => {
                    localStorage.setItem('cliptune_tour_seen', 'true');
                    driverObj.destroy();
                },
            });

            driverObj.drive();
        }
    }, [hasSeenTour]);

    return null; // This component doesn't render anything visible itself
}
