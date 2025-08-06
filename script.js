document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const photoUpload = document.getElementById('photo-upload');
    const uploadPreview = document.getElementById('upload-preview');
    const cardTitle = document.getElementById('card-title');
    const cardMessage = document.getElementById('card-message');
    const cardTimeline = document.getElementById('card-timeline');
    const flipBtn = document.getElementById('flip-card');
    const colorOptions = document.querySelectorAll('input[name="back-color"]');
    const photoCard = document.getElementById('photo-card');

    // Card display elements
    const cardImage = document.getElementById('card-image');
    const cardTitleDisplay = document.getElementById('card-title-display');
    const cardDateDisplay = document.getElementById('card-date-display');
    const cardMessageDisplay = document.getElementById('card-message-display');
    const cardTimelineDisplay = document.getElementById('card-timeline-display');

    // Title size radio buttons
    const titleSizeRadios = document.querySelectorAll('input[name="title-size"]');

    let uploadedImageUrl = null;

    // Photo upload handling
    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImageUrl = e.target.result;
                uploadPreview.style.backgroundImage = `url(${uploadedImageUrl})`;
                uploadPreview.classList.add('has-image');
                uploadPreview.innerHTML = '';

                // ---- Live preview on card ----
                cardImage.style.backgroundImage = `url(${uploadedImageUrl})`;
                cardImage.innerHTML = '';
            };
            reader.readAsDataURL(file);
        }
    });

    // ---------- Title size selection ----------
    function updateTitleSize(sizeKey) {
        const remMap = {
            small: 2,
            medium: 2.6,
            large: 3.2
        };
        const rem = remMap[sizeKey] || 2.6;
        cardTitleDisplay.style.fontSize = `${rem}rem`;
    }

    // Initialize with default option
    titleSizeRadios.forEach(radio => {
        if (radio.checked) {
            updateTitleSize(radio.value);
        }
    });

    // Update on selection change
    titleSizeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                updateTitleSize(this.value);
            }
        });
    });

    // ---------- Real-time preview updates ----------
    cardTitle.addEventListener('input', function() {
        cardTitleDisplay.textContent = this.value || '타이틀';
    });

    cardMessage.addEventListener('input', function() {
        cardMessageDisplay.textContent = this.value || '메시지가 여기에 표시됩니다';
    });

    cardTimeline.addEventListener('input', function() {
        updateTimelineDisplay(this.value);
    });

    // Function to format timeline display
    function updateTimelineDisplay(timelineText) {
        if (!timelineText.trim()) {
            cardTimelineDisplay.innerHTML = '타임라인이 여기에 표시됩니다';
            return;
        }

        const lines = timelineText.split('\n');
        const formattedLines = lines.map(line => {
            // Preserve spaces and empty lines
            const content = line || '&nbsp;'; // Use non-breaking space for empty lines
            return `<div class="timeline-item">${content}</div>`;
        }).join('');
        
        cardTimelineDisplay.innerHTML = formattedLines;
    }

    // Flip card
    flipBtn.addEventListener('click', function() {
        photoCard.classList.toggle('flipped');
        
        // Update button text
        if (photoCard.classList.contains('flipped')) {
            flipBtn.textContent = '앞면 보기';
        } else {
            flipBtn.textContent = '뒷면 보기';
        }
    });



    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #f44336, #da190b)';
                break;
            case 'info':
            default:
                notification.style.background = 'linear-gradient(135deg, #2196F3, #0b7dda)';
                break;
        }

        // Add to body
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Initialize timeline display
    updateTimelineDisplay('');

    // Background color change functionality
    colorOptions.forEach(option => {
        option.addEventListener('change', function() {
            const cardBack = photoCard.querySelector('.card-back');
            // Remove all gradient classes
            cardBack.classList.remove('gradient1', 'gradient2', 'gradient3', 'gradient4', 'gradient5');
            // Add selected gradient class
            cardBack.classList.add(this.value);
        });
    });

    // Drag and drop functionality for photo upload
    const dropZone = uploadPreview;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.style.borderColor = '#667eea';
        dropZone.style.backgroundColor = '#f8f9ff';
    }

    function unhighlight(e) {
        dropZone.style.borderColor = '#e1e5e9';
        dropZone.style.backgroundColor = 'transparent';
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                photoUpload.files = files;
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadedImageUrl = e.target.result;
                    uploadPreview.style.backgroundImage = `url(${uploadedImageUrl})`;
                    uploadPreview.classList.add('has-image');
                    uploadPreview.innerHTML = '';
                };
                reader.readAsDataURL(file);
            }
        }
    }

    // Download functionality
    const downloadBtn = document.getElementById('download-btn');
    
    downloadBtn.addEventListener('click', function() {
        const card = document.getElementById('photo-card');
        const isFlipped = card.classList.contains('flipped');
        const viewType = isFlipped ? '뒷면' : '앞면';
        
        // Show loading notification
        showNotification('포토카드를 생성중입니다...', 'info');
        
        // Get the specific card face to capture
        let targetElement;
        if (isFlipped) {
            targetElement = card.querySelector('.card-back');
        } else {
            targetElement = card.querySelector('.card-front');
        }
        
        // Temporarily reset transforms for clean capture
        const originalTransform = card.style.transform;
        const originalCardTransform = targetElement.style.transform;
        
        card.style.transform = 'none';
        targetElement.style.transform = 'none';
        targetElement.style.backfaceVisibility = 'visible';
        
        // Configure html2canvas options
        const options = {
            backgroundColor: isFlipped ? null : '#ffffff',
            scale: 2, // Higher resolution
            useCORS: true,
            allowTaint: true,
            logging: false,
            width: 414,
            height: 640
        };
        
        // Small delay to ensure styles are applied
        setTimeout(() => {
            html2canvas(targetElement, options).then(function(canvas) {
                // Restore original transforms
                card.style.transform = originalTransform;
                targetElement.style.transform = originalCardTransform;
                targetElement.style.backfaceVisibility = 'hidden';
                
                // Create download link
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `AI_Dream_포토카드_${viewType}_${new Date().toISOString().slice(0, 10)}.jpg`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    // Show success notification
                    showNotification(`${viewType} 포토카드가 다운로드되었습니다!`, 'success');
                }, 'image/jpeg', 0.95);
            }).catch(function(error) {
                // Restore original transforms on error
                card.style.transform = originalTransform;
                targetElement.style.transform = originalCardTransform;
                targetElement.style.backfaceVisibility = 'hidden';
                
                console.error('다운로드 실패:', error);
                showNotification('다운로드에 실패했습니다. 다시 시도해주세요.', 'error');
            });
        }, 100);
    });
});
