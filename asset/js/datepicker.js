// Date Picker Implementation
class DateRangePicker {
    constructor() {
        this.currentDate = new Date();
        this.selectedStartDate = null;
        this.selectedEndDate = null;
        this.isSelectingEndDate = false;
        
        this.overlay = document.getElementById('datePickerOverlay');
        this.monthYearDisplay = document.getElementById('monthYear');
        this.calendarDays = document.getElementById('calendarDays');
        this.startDateInput = document.getElementById('startDate');
        this.endDateInput = document.getElementById('endDate');
        
        this.init();
    }
    
    init() {
        // Add click handlers to all "Date Range" buttons
        const dateRangeButtons = document.querySelectorAll('.date-range-btn, .action-btn.gray');
        dateRangeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.openPicker());
        });
        
        // Navigation buttons
        document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));
        
        // Action buttons
        document.getElementById('cancelBtn').addEventListener('click', () => this.closePicker());
        document.getElementById('applyBtn').addEventListener('click', () => this.applyDateRange());
        
        // Quick select buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const range = e.target.dataset.range;
                this.setQuickRange(range);
            });
        });
        
        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closePicker();
            }
        });
        
        this.renderCalendar();
    }
    
    openPicker() {
        this.overlay.classList.add('active');
        this.renderCalendar();
    }
    
    closePicker() {
        this.overlay.classList.remove('active');
    }
    
    changeMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.renderCalendar();
    }
    
    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        this.monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Adjust for Monday start (0 = Monday, 6 = Sunday)
        const adjustedStartDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
        
        // Get previous month days
        const prevMonth = new Date(year, month, 0);
        const daysInPrevMonth = prevMonth.getDate();
        
        // Clear calendar
        this.calendarDays.innerHTML = '';
        
        // Add previous month days
        for (let i = adjustedStartDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            this.createDayElement(day, true, new Date(year, month - 1, day));
        }
        
        // Add current month days
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = date.toDateString() === today.toDateString();
            this.createDayElement(day, false, date, isToday);
        }
        
        // Add next month days to fill grid
        const totalCells = this.calendarDays.children.length;
        const remainingCells = 42 - totalCells; // 6 rows * 7 days
        for (let day = 1; day <= remainingCells; day++) {
            this.createDayElement(day, true, new Date(year, month + 1, day));
        }
    }
    
    createDayElement(day, isOtherMonth, date, isToday = false) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;
        
        if (isOtherMonth) {
            dayEl.classList.add('other-month');
        }
        
        if (isToday) {
            dayEl.classList.add('today');
        }
        
        // Check if date is selected
        if (this.selectedStartDate && date.toDateString() === this.selectedStartDate.toDateString()) {
            dayEl.classList.add('selected', 'start-date');
        }
        
        if (this.selectedEndDate && date.toDateString() === this.selectedEndDate.toDateString()) {
            dayEl.classList.add('selected', 'end-date');
        }
        
        // Check if date is in range
        if (this.selectedStartDate && this.selectedEndDate) {
            if (date > this.selectedStartDate && date < this.selectedEndDate) {
                dayEl.classList.add('in-range');
            }
        }
        
        // Add some dots to specific dates (like in the screenshot)
        if ([1, 9, 30].includes(day) && !isOtherMonth) {
            dayEl.classList.add('has-dot');
        }
        
        if (!isOtherMonth) {
            dayEl.addEventListener('click', () => this.selectDate(date, dayEl));
        }
        
        this.calendarDays.appendChild(dayEl);
    }
    
    selectDate(date, element) {
        if (!this.selectedStartDate || (this.selectedStartDate && this.selectedEndDate)) {
            // Start new selection
            this.selectedStartDate = date;
            this.selectedEndDate = null;
            this.isSelectingEndDate = true;
            this.startDateInput.value = this.formatDate(date);
            this.endDateInput.value = '';
        } else if (this.isSelectingEndDate) {
            // Select end date
            if (date >= this.selectedStartDate) {
                this.selectedEndDate = date;
                this.endDateInput.value = this.formatDate(date);
                this.isSelectingEndDate = false;
            } else {
                // If selected date is before start date, restart selection
                this.selectedStartDate = date;
                this.selectedEndDate = null;
                this.startDateInput.value = this.formatDate(date);
                this.endDateInput.value = '';
            }
        }
        
        this.renderCalendar();
    }
    
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    setQuickRange(range) {
        const today = new Date();
        const endDate = new Date(today);
        let startDate = new Date(today);
        
        switch(range) {
            case 'week':
                startDate.setDate(today.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(today.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(today.getFullYear() - 1);
                break;
        }
        
        this.selectedStartDate = startDate;
        this.selectedEndDate = endDate;
        this.startDateInput.value = this.formatDate(startDate);
        this.endDateInput.value = this.formatDate(endDate);
        
        // Navigate to the start date's month
        this.currentDate = new Date(startDate);
        this.renderCalendar();
    }
    
    applyDateRange() {
        if (this.selectedStartDate && this.selectedEndDate) {
            console.log('Selected Date Range:', {
                start: this.formatDate(this.selectedStartDate),
                end: this.formatDate(this.selectedEndDate)
            });
            
            // You can add your custom logic here to handle the selected date range
            // For example, update the UI or fetch data based on the date range
            
            this.closePicker();
        } else {
            alert('Please select both start and end dates');
        }
    }
}

// Initialize date picker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DateRangePicker();
});

