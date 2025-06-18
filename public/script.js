class BMICalculatorFrontend {
    constructor() {
        this.isMetric = true;
        this.initializeEventListeners();
        this.updateUnits();
        this.loadHistory();
    }

    initializeEventListeners() {
        // Unit system change
        const unitRadios = document.querySelectorAll('input[name="unitSystem"]');
        unitRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.isMetric = e.target.value === 'metric';
                this.updateUnits();
            });
        });

        // Form submission
        const form = document.getElementById('bmiForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateBMI();
        });

        // History toggle
        const toggleBtn = document.getElementById('toggleHistory');
        toggleBtn.addEventListener('click', () => {
            this.toggleHistory();
        });
    }

    updateUnits() {
        const weightUnit = document.getElementById('weightUnit');
        const heightUnit = document.getElementById('heightUnit');
        
        if (this.isMetric) {
            weightUnit.textContent = 'kg';
            heightUnit.textContent = 'cm';
        } else {
            weightUnit.textContent = 'lbs';
            heightUnit.textContent = 'in';
        }
    }

    async calculateBMI() {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        
        if (!weight || !height || weight <= 0 || height <= 0) {
            alert('Please enter valid weight and height values.');
            return;
        }

        // Show loading
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('resultsCard').classList.add('hidden');

        try {
            const response = await fetch('/api/calculate-bmi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    weight: weight,
                    height: height,
                    isMetric: this.isMetric
                })
            });

            const result = await response.json();

            if (result.success) {
                this.displayResults(result.data);
                this.loadHistory(); // Refresh history
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('Error calculating BMI. Please try again.');
            console.error('Error:', error);
        } finally {
            document.getElementById('loading').classList.add('hidden');
        }
    }

    displayResults(data) {
        // Update BMI value and category
        document.getElementById('bmiValue').textContent = data.bmi.toFixed(1);
        document.getElementById('bmiCategory').textContent = data.category;
        
        // Set category color
        const categoryElement = document.getElementById('bmiCategory');
        categoryElement.className = 'bmi-category ' + this.getCategoryClass(data.category);
        
        // Update other details
        document.getElementById('idealWeight').textContent = data.idealWeight.toFixed(1);
        document.getElementById('healthRisks').textContent = data.healthRisks;
        document.getElementById('suggestion').textContent = data.suggestion;
        
        // Show results card
        document.getElementById('resultsCard').classList.remove('hidden');
        
        // Scroll to results
        document.getElementById('resultsCard').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    getCategoryClass(category) {
        switch (category) {
            case 'Underweight': return 'category-underweight';
            case 'Normal weight': return 'category-normal';
            case 'Overweight': return 'category-overweight';
            case 'Obesity': return 'category-obesity';
            default: return '';
        }
    }

    async loadHistory() {
        try {
            const response = await fetch('/api/bmi-history');
            const result = await response.json();
            
            if (result.success) {
                this.displayHistory(result.history);
            }
        } catch (error) {
            console.error('Error loading history:', error);
        }
    }

    displayHistory(history) {
        const historyList = document.getElementById('historyList');
        
        if (history.length === 0) {
            historyList.innerHTML = '<p class="no-history">No calculations yet.</p>';
            return;
        }

        historyList.innerHTML = history.map(entry => {
            return `<div class="history-item">${entry}</div>`;
        }).join('');
    }

    toggleHistory() {
        const historyContent = document.getElementById('historyContent');
        const toggleBtn = document.getElementById('toggleHistory');
        
        if (historyContent.classList.contains('hidden')) {
            historyContent.classList.remove('hidden');
            toggleBtn.textContent = 'Hide History';
            this.loadHistory(); // Refresh when showing
        } else {
            historyContent.classList.add('hidden');
            toggleBtn.textContent = 'Show History';
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BMICalculatorFrontend();
});