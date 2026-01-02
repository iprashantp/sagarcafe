/* ==========================================
   BILLING SYSTEM - SAGAR CAFE
   Architecture: MVC Pattern with Observer
   ========================================== */

// ==========================================
// Data Model (Static Inventory)
// ==========================================

// Inventory Data - Embedded for static site compatibility
const INVENTORY_DATA = {
    "paratha": [
        { "name": "Aloo Paratha (2)", "price": 60, "icon": "🫓" },
        { "name": "Gobhee Paratha (2)", "price": 70, "icon": "🫓" },
        { "name": "Onion Paratha (2)", "price": 50, "icon": "🫓" },
        { "name": "Aloo + Onion Paratha (2)", "price": 70, "icon": "🫓" },
        { "name": "Paneer Paratha (2)", "price": 90, "icon": "🫓" }
    ],
    "maggi": [
        { "name": "Plain Maggi", "price": 40, "icon": "🍜" },
        { "name": "Veg Maggi", "price": 50, "icon": "🍜" },
        { "name": "Veg Cheese Maggi", "price": 70, "icon": "🍜" },
        { "name": "Butter Masala Maggi", "price": 70, "icon": "🍜" }
    ],
    "burger": [
        { "name": "Veg Burger", "price": 60, "icon": "🍔" },
        { "name": "Veg Cheese Burger", "price": 75, "icon": "🍔" },
        { "name": "Veg King Burger", "price": 110, "icon": "🍔" }
    ],
    "chinese": [
        { "name": "Veg Noodles", "price": 55, "icon": "🍜" },
        { "name": "Veg Manchurian", "price": 65, "icon": "🥟" },
        { "name": "Gabhi Manchurian", "price": 75, "icon": "🥟" },
        { "name": "Gravy Manchurian", "price": 70, "icon": "🥟" },
        { "name": "Manchurian + Noodles", "price": 100, "icon": "🍜" },
        { "name": "Fried Rice", "price": 70, "icon": "🍚" },
        { "name": "Chilli Paneer", "price": 100, "icon": "🧈" },
        { "name": "Veg Kothe", "price": 70, "icon": "🥟" }
    ],
    "pizza": [
        { "name": "Veg Pizza", "price": 100, "icon": "🍕" },
        { "name": "Corn & Cheese Pizza", "price": 120, "icon": "🍕" },
        { "name": "Veg Cheese Pizza", "price": 150, "icon": "🍕" },
        { "name": "Veg Paneer Pizza", "price": 150, "icon": "🍕" },
        { "name": "Cheese Burst Pizza", "price": 200, "icon": "🍕" }
    ],
    "fries": [
        { "name": "French Fries", "price": 40, "icon": "🍟" },
        { "name": "Peri Peri French Fries", "price": 60, "icon": "🍟" }
    ],
    "chole-bhature": [
        { "name": "Chole Bhature", "price": 80, "icon": "🫔" }
    ],
    "pav-bhaji": [
        { "name": "Pav Bhaji", "price": 70, "icon": "🍲" }
    ],
    "dosa": [
        { "name": "Plain Dosa", "price": 40, "icon": "🍽️" },
        { "name": "Masala Dosa", "price": 60, "icon": "🍽️" },
        { "name": "Paneer Masala Dosa", "price": 80, "icon": "🍽️" },
        { "name": "Butter Masala Dosa", "price": 90, "icon": "🍽️" },
        { "name": "Ghee Masala Dosa", "price": 90, "icon": "🍽️" }
    ],
    "sandwich": [
        { "name": "Veg Sandwich", "price": 45, "icon": "🥪" },
        { "name": "Grilled Sandwich", "price": 55, "icon": "🥪" },
        { "name": "Paneer Sandwich", "price": 65, "icon": "🥪" },
        { "name": "Veg Cheese Sandwich", "price": 75, "icon": "🥪" }
    ],
    "pasta": [
        { "name": "Masala Pasta", "price": 80, "icon": "🍝" },
        { "name": "White Sauce Pasta", "price": 100, "icon": "🍝" }
    ],
    "coffee": [
        { "name": "Tea", "price": 15, "icon": "🍵" },
        { "name": "Hot Coffee", "price": 25, "icon": "☕" }
    ],
    "momos": [
        { "name": "Steamed Momos", "price": 50, "icon": "🥟" },
        { "name": "Fried Momos", "price": 60, "icon": "🥟" },
        { "name": "Paneer Momos", "price": 70, "icon": "🥟" }
    ],
    "water": [
        { "name": "water bottle 250ml", "price": 5, "icon": "🥛" },
        { "name": "water bottle 500ml", "price": 10, "icon": "🥛" },
        { "name": "water bottle 1L", "price": 20, "icon": "🥛" },
        { "name": "water bottle 2L", "price": 35, "icon": "🥛" }
    ]
};

class InventoryModel {
    constructor() {
        this.items = [];
        this.isLoaded = false;
    }

    loadInventory() {
        try {
            console.log('Loading inventory...', INVENTORY_DATA);
            // Convert embedded data structure to items array with IDs
            let id = 1;
            this.items = [];
            
            for (const [category, items] of Object.entries(INVENTORY_DATA)) {
                items.forEach(item => {
                    this.items.push({
                        id: id++,
                        name: item.name,
                        price: item.price,
                        category: category,
                        icon: item.icon
                    });
                });
            }
            
            console.log('Inventory loaded, total items:', this.items.length, this.items);
            this.isLoaded = true;
            return true;
        } catch (error) {
            console.error('Error loading inventory:', error);
            return false;
        }
    }

    getAllItems() {
        return [...this.items];
    }

    getItemById(id) {
        return this.items.find(item => item.id === id);
    }

    getItemsByCategory(category) {
        if (category === 'all') return this.getAllItems();
        return this.items.filter(item => item.category === category);
    }

    searchItems(query) {
        const lowerQuery = query.toLowerCase();
        return this.items.filter(item => 
            item.name.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery)
        );
    }
}

// ==========================================
// Bill Model
// ==========================================
class BillModel {
    constructor() {
        this.items = [];
        this.billNumber = this.generateBillNumber();
        this.date = new Date();
        this.customerName = '';
        this.customerContact = '';
        this.discountPercent = 0;
        this.taxPercent = 0; // 0% tax
        this.observers = [];
    }

    // Observer Pattern
    subscribe(observer) {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach(observer => observer());
    }

    generateBillNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}${month}${day}`;
        
        // Get or initialize counter from localStorage
        const storageKey = 'billCounter';
        const storageDateKey = 'billCounterDate';
        const today = dateStr;
        const storedDate = localStorage.getItem(storageDateKey);
        
        let counter = 1;
        
        // Check if it's a new day
        if (storedDate === today) {
            // Same day, increment counter
            counter = parseInt(localStorage.getItem(storageKey) || '1', 10) + 1;
        } else {
            // New day, reset counter to 1
            counter = 1;
            localStorage.setItem(storageDateKey, today);
        }
        
        // Save the counter
        localStorage.setItem(storageKey, counter.toString());
        
        return `${dateStr}${counter}`;
    }

    addItem(item, customPrice = null) {
        const existingItem = this.items.find(i => i.id === item.id && i.price === (customPrice || item.price));
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: item.id,
                name: item.name,
                price: customPrice || item.price,
                originalPrice: item.price,
                quantity: 1,
                isPriceModified: customPrice !== null && customPrice !== item.price
            });
        }
        
        this.notify();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.notify();
    }

    updateQuantity(index, quantity) {
        if (quantity <= 0) {
            this.removeItem(index);
        } else {
            this.items[index].quantity = quantity;
            this.notify();
        }
    }

    updateItemPrice(index, newPrice, quantity) {
        const item = this.items[index];
        item.price = newPrice;
        item.quantity = quantity;
        item.isPriceModified = newPrice !== item.originalPrice;
        this.notify();
    }

    clearBill() {
        this.items = [];
        this.billNumber = this.generateBillNumber();
        this.customerName = '';
        this.customerContact = '';
        this.discountPercent = 0;
        this.notify();
    }

    setCustomerName(name) {
        this.customerName = name;
    }

    setCustomerContact(contact) {
        this.customerContact = contact;
    }

    setDiscount(percent) {
        this.discountPercent = Math.max(0, Math.min(100, percent));
        this.notify();
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getTax() {
        return (this.getSubtotal() * this.taxPercent) / 100;
    }

    getDiscount() {
        const subtotal = this.getSubtotal();
        return (subtotal * this.discountPercent) / 100;
    }

    getTotal() {
        return this.getSubtotal() + this.getTax() - this.getDiscount();
    }

    getBillData() {
        return {
            billNumber: this.billNumber,
            date: this.date,
            customerName: this.customerName || 'Walk-in Customer',
            customerContact: this.customerContact || '',
            items: [...this.items],
            subtotal: this.getSubtotal(),
            tax: this.getTax(),
            taxPercent: this.taxPercent,
            discount: this.getDiscount(),
            discountPercent: this.discountPercent,
            total: this.getTotal()
        };
    }
}

// ==========================================
// View Controller
// ==========================================
class BillingView {
    constructor() {
        this.inventoryGrid = document.getElementById('inventoryGrid');
        this.billItems = document.getElementById('billItems');
        this.searchInput = document.getElementById('searchInventory');
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.customerNameInput = document.getElementById('customerName');
        this.customerContactInput = document.getElementById('customerContact');
        this.billNumberInput = document.getElementById('billNumber');
        this.billDateInput = document.getElementById('billDate');
        this.discountInput = document.getElementById('discountPercent');
        
        // Summary elements
        this.subtotalEl = document.getElementById('subtotal');
        this.taxEl = document.getElementById('tax');
        this.discountEl = document.getElementById('discount');
        this.totalEl = document.getElementById('total');
    }

    renderCategoryFilters(categories) {
        const categoryFilters = document.querySelector('.category-filters');
        if (!categoryFilters) return;

        // Category icons mapping
        const categoryIcons = {
            'paratha': 'fa-bread-slice',
            'maggi': 'fa-bowl-food',
            'burger': 'fa-burger',
            'chinese': 'fa-bowl-rice',
            'pizza': 'fa-pizza-slice',
            'fries': 'fa-french-fries',
            'chole-bhature': 'fa-plate-wheat',
            'pav-bhaji': 'fa-bowl-food',
            'dosa': 'fa-plate-wheat',
            'sandwich': 'fa-sandwich',
            'pasta': 'fa-spaghetti-monster-flying',
            'coffee': 'fa-mug-hot',
            'momos': 'fa-dumpling',
            'water': 'fa-water'
        };

        // Generate category buttons
        const buttonsHTML = [
            '<button class="category-btn active" data-category="all"><i class="fas fa-th"></i> All</button>',
            ...categories.map(cat => {
                const icon = categoryIcons[cat] || 'fa-utensils';
                const label = cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                return `<button class="category-btn" data-category="${cat}"><i class="fas ${icon}"></i> ${label}</button>`;
            })
        ].join('');

        categoryFilters.innerHTML = buttonsHTML;
        
        // Update category buttons reference
        this.categoryButtons = document.querySelectorAll('.category-btn');
    }

    renderInventory(items) {
        console.log('Rendering inventory items:', items);
        this.inventoryGrid.innerHTML = items.map(item => `
            <div class="inventory-item" data-id="${item.id}">
                <div class="item-icon">${item.icon}</div>
                <div class="item-name">${item.name}</div>
                <div class="item-price">₹${item.price}</div>
                <div class="item-category">${item.category}</div>
            </div>
        `).join('');
        console.log('Inventory grid HTML updated');
    }

    renderBillItems(items) {
        if (items.length === 0) {
            this.billItems.innerHTML = `
                <div class="empty-bill">
                    <i class="fas fa-shopping-cart"></i>
                    <p>No items added yet</p>
                    <small>Select items from the menu to start billing</small>
                </div>
            `;
            return;
        }

        this.billItems.innerHTML = items.map((item, index) => `
            <div class="bill-item">
                <div class="bill-item-header">
                    <div class="bill-item-name">
                        ${item.name}
                        ${item.isPriceModified ? '<i class="fas fa-edit" style="color: var(--warning-color); font-size: 0.9rem;" title="Price modified"></i>' : ''}
                    </div>
                    <button class="bill-item-remove" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="bill-item-details">
                    <div class="bill-item-quantity">
                        <button class="qty-btn qty-minus" data-index="${index}">-</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn qty-plus" data-index="${index}">+</button>
                    </div>
                    <div class="bill-item-price">
                        <div class="price-per-unit">₹${item.price} × ${item.quantity}</div>
                        <div class="price-total ${item.isPriceModified ? 'price-modified' : ''}">
                            ₹${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                </div>
                <button class="bill-item-edit" data-index="${index}">
                    <i class="fas fa-edit"></i> Edit Price/Quantity
                </button>
            </div>
        `).join('');
    }

    renderSummary(billData) {
        this.subtotalEl.textContent = `₹${billData.subtotal.toFixed(2)}`;
        this.taxEl.textContent = `₹${billData.tax.toFixed(2)}`;
        this.discountEl.textContent = `-₹${billData.discount.toFixed(2)}`;
        this.totalEl.textContent = `₹${billData.total.toFixed(2)}`;
    }

    setBillInfo(billNumber, date) {
        this.billNumberInput.value = billNumber;
        this.billDateInput.value = this.formatDate(date);
    }

    formatDate(date) {
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    setActiveCategory(category) {
        this.categoryButtons.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    showNotification(message, type = 'success') {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ==========================================
// PDF Generator
// ==========================================
class PDFGenerator {
    constructor(billData) {
        this.billData = billData;
    }

    generateHTML() {
        const { billNumber, date, customerName, customerContact, items, subtotal, tax, taxPercent, discount, discountPercent, total } = this.billData;
        
        return `
            <div class="bill-template" style="max-width: 302px; margin: 0 auto; font-family: 'Poppins', sans-serif; padding: 0.5rem;">
                <div class="bill-header" style="border-bottom: 1px dotted #000; padding: 0.5rem 0.3rem 0.6rem 0.3rem; margin-bottom: 0.4rem;">
                    <div style="display: flex; gap: 0.4rem; margin-bottom: 0.15rem;">
                        <div style="width: 60px; height: 60px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABhsAAAYbCAYAAAAGsQssAAAACXBIWXMAAC4jAAAuIwF4pT92AAAE4mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTEyLTE1PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjQ5MTE1ZWFlLTU1NDItNDA3ZC1iZDllLWUzM2RmZDYzMGU3YjwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5TYWdhckNhZmVLaXRjaGVuTG9nbyAtIDE8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+UHJhc2hhbnQgUGF0ZWw8L3BkZjpBdXRob3I+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YSBkb2M9REFHN25BeG5MUGcgdXNlcj1VQURveXhFc3FjayBicmFuZD1UaW1lVHJhdmVsbGVycyB0ZW1wbGF0ZT1ZZWxsb3cgYW5kIEJyb3duIE1pbmltYWxpc3QgS2l0Y2hlbiBMb2dvPC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0ncic/Ptpr+c8AACAASURBVHic7N0JlN1VfcDxgIZ9F5BFEBVEwMiSsAgKo4RA5t3/SCuperDUgiwKUrQKAiKKWMQFBFFEhWKrggJFBStL0aLWaIMiNNbk/3+TsEgasK0iuLDl1/veYI+eWsgyb+6bmc/nnO/5mwnHM/N/mffu/973/nfKFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADACcLJod1M8iXeAAAAAElFTkSuQmCC
    " alt="Sagar Cafe Logo" style="width: 60px; height: 60px; display: block;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                            <h1 style="font-family: 'Playfair Display', serif; color: #2c3e50; margin: 0 0 0.1rem 0; font-size: 1.3rem; line-height: 1.1;">
                                Sagar Cafe
                            </h1>
                            <p class="tagline" style="color: #7f8c8d; font-size: 0.65rem; font-style: italic; margin: 0; line-height: 1.2;">
                                Where Every Wave Brings Flavor
                            </p>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-top: 0.3rem;">
                        <p style="color: #7f8c8d; font-size: 0.6rem; margin: 0; line-height: 1.4; padding-bottom: 0.35rem;">☎️ +91 9174849029</p>
                        <p style="color: #7f8c8d; font-size: 0.6rem; margin: 0; line-height: 1.4; padding-bottom: 0.35rem;">📍 Jabalpur Road, Makronia, Sagar</p>
                    </div>
                </div>

                <div class="bill-info" style="margin-bottom: 0.4rem; font-size: 0.65rem; padding: 0.3rem 0.3rem 0.2rem 0.3rem; color: #2c3e50;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.15rem;">
                        <span style="color: #2c3e50;"><strong>Bill No.:</strong> <span style="font-weight: 600; color: #000;">${billNumber}</span></span>
                        <span style="color: #2c3e50;"><strong>Date:</strong> <span style="font-weight: 600; color: #000;">${new Date(date).toLocaleDateString('en-IN')}</span></span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.15rem;">
                        <span style="color: #2c3e50;"><strong>Customer:</strong> <span style="font-weight: 600; color: #000;">${customerName}</span></span>
                        <span style="color: #2c3e50;"><strong>Time:</strong> <span style="font-weight: 600; color: #000;">${new Date(date).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}</span></span>
                    </div>
                    ${customerContact ? `<div style="margin-bottom: 0.15rem;">
                        <span style="color: #2c3e50;"><strong>Contact:</strong> <span style="font-weight: 600; color: #000;">${customerContact}</span></span>
                    </div>` : ''}
                </div>

                <div style="padding: 0 0.3rem;">
                <table class="bill-table" style="width: 100%; border-collapse: collapse; margin-bottom: 0.5rem;">
                    <thead>
                        <tr style="border-bottom: 1px dotted #000;">
                            <th style="padding: 0.4rem 0.3rem; text-align: left; vertical-align: middle; font-weight: 600; font-size: 0.75rem; color: #000;">Item</th>
                            <th style="padding: 0.4rem 0.3rem; text-align: center; vertical-align: middle; font-weight: 600; font-size: 0.75rem; color: #000;">Qty</th>
                            <th style="padding: 0.4rem 0.3rem; text-align: right; vertical-align: middle; font-weight: 600; font-size: 0.75rem; color: #000;">Price</th>
                            <th style="padding: 0.4rem 0.3rem; text-align: right; vertical-align: middle; font-weight: 600; font-size: 0.75rem; color: #000;">Amt</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                            <tr>
                                <td style="padding: 0.35rem 0.3rem; border-bottom: 1px dotted #ddd; color: #000; font-size: 0.75rem;">
                                    ${item.name}
                                    ${item.isPriceModified ? '<span style="color: #666; font-size: 0.65rem;"> (Modified)</span>' : ''}
                                </td>
                                <td style="padding: 0.35rem 0.3rem; border-bottom: 1px dotted #ddd; text-align: center; color: #000; font-size: 0.75rem;">${item.quantity}</td>
                                <td style="padding: 0.35rem 0.3rem; border-bottom: 1px dotted #ddd; text-align: right; color: #000; font-size: 0.75rem;">₹${item.price.toFixed(2)}</td>
                                <td style="padding: 0.35rem 0.3rem; border-bottom: 1px dotted #ddd; text-align: right; color: #000; font-size: 0.75rem;">₹${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="bill-totals" style="margin-left: auto; width: 100%; margin-bottom: 0.5rem; padding: 0 0.3rem;">
                    <div class="bill-totals-row" style="display: flex; justify-content: space-between; padding: 0.35rem 0.5rem; color: #000; font-size: 0.75rem;">
                        <span>Sub Total</span>
                        <span>₹${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="bill-totals-row" style="display: flex; justify-content: space-between; padding: 0.25rem 0.5rem 0.25rem 2rem; color: #000; font-size: 0.7rem;">
                        <span>CGST @ ${(taxPercent/2).toFixed(2)}%</span>
                        <span>₹${(tax/2).toFixed(2)}</span>
                    </div>
                    <div class="bill-totals-row" style="display: flex; justify-content: space-between; padding: 0.25rem 0.5rem 0.25rem 2rem; color: #000; font-size: 0.7rem;">
                        <span>SGST @ ${(taxPercent/2).toFixed(2)}%</span>
                        <span>₹${(tax/2).toFixed(2)}</span>
                    </div>
                    ${discount > 0 ? `
                        <div class="bill-totals-row" style="display: flex; justify-content: space-between; padding: 0.35rem 0.5rem; color: #000; font-size: 0.75rem;">
                            <span>(-) Discount</span>
                            <span>₹${discount.toFixed(2)}</span>
                        </div>
                    ` : ''}
                    <div class="bill-totals-total" style="border-top: 1px dotted #000; margin-top: 0.2rem; padding: 0.4rem 0.5rem 0.3rem 0.5rem; font-size: 0.9rem; font-weight: 700; color: #000; display: flex; justify-content: space-between;">
                        <span>Total:</span>
                        <span>₹${total.toFixed(2)}</span>
                    </div>
                </div>

                <div class="bill-footer" style="text-align: center; border-top: 1px dotted #000; padding: 0.7rem 0.3rem 0.6rem 0.3rem; color: #666; font-size: 0.65rem;">
                    <p class="thank-you" style="font-size: 0.8rem; color: #000000ff; font-weight: 600; margin: 0 0 0.3rem 0; line-height: 1.4;">
                        Thank You! Visit Again! 🙏
                    </p>
                    <p style="margin: 0.2rem 0; font-size: 0.55rem; line-height: 1.3;">
                        🌐 www.sagarcafe.in
                    </p>
                    <p style="margin: 0.2rem 0; font-size: 0.55rem; line-height: 1.3;">
                        fssai license no.: 21426470000031
                    </p>
                </div>
                </div>
            </div>
        `;
    }

    async generatePDF() {
        // Check if libraries are loaded
        if (typeof window.jspdf === 'undefined') {
            throw new Error('jsPDF library not loaded');
        }
        if (typeof html2canvas === 'undefined') {
            throw new Error('html2canvas library not loaded');
        }
        
        const { jsPDF } = window.jspdf;
        
        // Create temporary container for thermal paper size (80mm)
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.width = '302px'; // Match thermal paper width
        tempContainer.innerHTML = this.generateHTML();
        document.body.appendChild(tempContainer);

        try {
            // Generate canvas from HTML with optimized settings
            const canvas = await html2canvas(tempContainer.querySelector('.bill-template'), {
                scale: 3, // Higher scale for better quality on thermal size
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: true,
                allowTaint: true
            });

            // Convert to JPEG for smaller file size
            const imgData = canvas.toDataURL('image/jpeg', 0.95); // Higher quality for thermal receipt
            
            const imgWidth = 75; // Slightly less than 80mm for margins
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            // Use thermal paper size with dynamic height based on content
            const pdfHeight = imgHeight + 10; // Add 10mm for top and bottom margins
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [80, pdfHeight], // 80mm width, dynamic height
                compress: true
            });
            
            pdf.addImage(imgData, 'JPEG', 2.5, 5, imgWidth, imgHeight, undefined, 'FAST'); // Centered on thermal paper
            
            return pdf;
        } catch (error) {
            console.error('PDF generation error:', error);
            throw error;
        } finally {
            document.body.removeChild(tempContainer);
        }
    }

    async download() {
        const pdf = await this.generatePDF();
        pdf.save(`SagarCafe_Bill_${this.billData.billNumber}.pdf`);
    }

    async print() {
        const pdf = await this.generatePDF();
        const blob = pdf.output('blob');
        const blobURL = URL.createObjectURL(blob);
        
        // Open in new window for printing
        const printWindow = window.open(blobURL, '_blank');
        
        if (printWindow) {
            printWindow.onload = function() {
                printWindow.print();
                // Clean up blob URL after printing
                setTimeout(() => URL.revokeObjectURL(blobURL), 1000);
            };
        } else {
            // Fallback: clean up if window didn't open
            URL.revokeObjectURL(blobURL);
        }
    }

    async share() {
        const pdf = await this.generatePDF();
        const blob = pdf.output('blob');
        
        const file = new File([blob], `SagarCafe_Bill_${this.billData.billNumber}.pdf`, {
            type: 'application/pdf'
        });

        // Detect iOS devices
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        // For iOS: Open PDF in new tab so user can use native share button
        if (isIOS) {
            try {
                const blobURL = URL.createObjectURL(blob);
                const newWindow = window.open(blobURL, '_blank');
                
                if (newWindow) {
                    // Clean up the blob URL after a delay
                    setTimeout(() => URL.revokeObjectURL(blobURL), 60000);
                    return true;
                } else {
                    // Popup blocked, fallback to download
                    return false;
                }
            } catch (error) {
                console.error('Error opening PDF:', error);
                return false;
            }
        }
        
        // Check if Web Share API is available (for Android/Desktop)
        if (navigator.share) {
            try {
                // Try to check if files can be shared
                const canShareFiles = navigator.canShare ? navigator.canShare({ files: [file] }) : true;
                
                if (canShareFiles) {
                    await navigator.share({
                        title: `Bill - ${this.billData.billNumber}`,
                        text: `Bill from Sagar Cafe - Total: ₹${this.billData.total.toFixed(2)}`,
                        files: [file]
                    });
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    // User cancelled the share, this is not an error
                    return true;
                }
                console.error('Error sharing:', error);
                return false;
            }
        } else {
            // No share support
            return false;
        }
    }
}

// ==========================================
// Main Controller
// ==========================================
class BillingController {
    constructor() {
        this.inventory = new InventoryModel();
        this.bill = new BillModel();
        this.view = new BillingView();
        this.currentCategory = 'all';
        this.currentEditIndex = null;
        
        this.init();
    }

    init() {
        // Subscribe to bill changes
        this.bill.subscribe(() => this.updateView());
        
        // Set bill info
        this.view.setBillInfo(this.bill.billNumber, this.bill.date);
        
        // Load inventory and initialize
        this.loadInventoryAndInit();
    }

    loadInventoryAndInit() {
        // Show loading state
        this.view.inventoryGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #7f8c8d;">
                <i class="fas fa-spinner fa-spin" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>Loading menu items...</p>
            </div>
        `;

        const loaded = this.inventory.loadInventory();
        
        if (!loaded) {
            this.view.inventoryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #e74c3c;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Failed to load menu items. Please refresh the page.</p>
                </div>
            `;
            return;
        }

        // Generate category filters from inventory data
        const categories = Object.keys(INVENTORY_DATA);
        this.view.renderCategoryFilters(categories);

        // Initial render
        this.renderInventory();
        this.updateView();
        
        // Bind events
        this.bindEvents();
    }

    bindEvents() {
        // Inventory item click
        this.view.inventoryGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.inventory-item');
            if (item) {
                const itemId = parseInt(item.dataset.id);
                this.addItemToBill(itemId);
            }
        });

        // Category filter
        this.view.categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentCategory = btn.dataset.category;
                this.view.setActiveCategory(this.currentCategory);
                this.renderInventory();
            });
        });

        // Search
        this.view.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Bill items actions
        this.view.billItems.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.bill-item-remove');
            const minusBtn = e.target.closest('.qty-minus');
            const plusBtn = e.target.closest('.qty-plus');
            const editBtn = e.target.closest('.bill-item-edit');

            if (removeBtn) {
                const index = parseInt(removeBtn.dataset.index);
                this.bill.removeItem(index);
                this.view.showNotification('Item removed', 'info');
            } else if (minusBtn) {
                const index = parseInt(minusBtn.dataset.index);
                const currentQty = this.bill.items[index].quantity;
                this.bill.updateQuantity(index, currentQty - 1);
            } else if (plusBtn) {
                const index = parseInt(plusBtn.dataset.index);
                const currentQty = this.bill.items[index].quantity;
                this.bill.updateQuantity(index, currentQty + 1);
            } else if (editBtn) {
                const index = parseInt(editBtn.dataset.index);
                this.openEditModal(index);
            }
        });

        // Customer name
        this.view.customerNameInput.addEventListener('change', (e) => {
            this.bill.setCustomerName(e.target.value);
        });

        // Discount
        this.view.discountInput.addEventListener('input', (e) => {
            this.bill.setDiscount(parseFloat(e.target.value) || 0);
        });

        // Clear bill
        document.getElementById('clearBill').addEventListener('click', () => {
            if (this.bill.items.length > 0) {
                if (confirm('Are you sure you want to clear all items?')) {
                    this.bill.clearBill();
                    this.view.customerNameInput.value = '';
                    this.view.discountInput.value = '0';
                    this.view.setBillInfo(this.bill.billNumber, this.bill.date);
                    this.view.showNotification('Bill cleared', 'info');
                }
            }
        });

        // Reset bill
        document.getElementById('resetBill').addEventListener('click', () => {
            if (this.bill.items.length > 0) {
                if (confirm('Are you sure you want to reset the bill?')) {
                    this.bill.clearBill();
                    this.view.customerNameInput.value = '';
                    this.view.discountInput.value = '0';
                    this.view.setBillInfo(this.bill.billNumber, this.bill.date);
                    this.view.showNotification('Bill reset', 'info');
                }
            }
        });

        // Generate bill
        document.getElementById('generateBill').addEventListener('click', () => {
            this.openCheckoutModal();
        });

        // Modal events
        this.bindModalEvents();
    }

    bindModalEvents() {
        const editModal = document.getElementById('editPriceModal');
        const checkoutModal = document.getElementById('checkoutModal');
        const previewModal = document.getElementById('billPreviewModal');

        // Edit modal
        editModal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeEditModal();
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.closeEditModal();
        });

        document.getElementById('saveEdit').addEventListener('click', () => {
            this.saveEdit();
        });

        // Checkout modal
        checkoutModal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeCheckoutModal();
        });

        document.getElementById('cancelCheckout').addEventListener('click', () => {
            this.closeCheckoutModal();
        });

        document.getElementById('confirmCheckout').addEventListener('click', () => {
            this.confirmCheckout();
        });

        document.getElementById('checkoutDiscount').addEventListener('input', (e) => {
            this.updateCheckoutSummary(parseFloat(e.target.value) || 0);
        });

        // Preview modal
        previewModal.querySelector('.modal-close').addEventListener('click', () => {
            this.closePreviewModal();
        });

        document.getElementById('closePreview').addEventListener('click', () => {
            this.closePreviewModal();
        });

        document.getElementById('downloadPDF').addEventListener('click', () => {
            this.downloadPDF();
        });

        document.getElementById('sharePDF').addEventListener('click', () => {
            this.sharePDF();
        });

        document.getElementById('printPDF').addEventListener('click', () => {
            this.printPDF();
        });

        // Close on outside click
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) this.closeEditModal();
        });

        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) this.closeCheckoutModal();
        });

        previewModal.addEventListener('click', (e) => {
            if (e.target === previewModal) this.closePreviewModal();
        });
    }

    addItemToBill(itemId) {
        const item = this.inventory.getItemById(itemId);
        if (item) {
            this.bill.addItem(item);
            this.view.showNotification(`${item.name} added to bill`, 'success');
        }
    }

    renderInventory() {
        console.log('Controller renderInventory called, category:', this.currentCategory);
        let items;
        if (this.currentCategory === 'all') {
            items = this.inventory.getAllItems();
        } else {
            items = this.inventory.getItemsByCategory(this.currentCategory);
        }
        console.log('Items to render:', items);
        this.view.renderInventory(items);
    }

    handleSearch(query) {
        if (query.trim() === '') {
            this.renderInventory();
        } else {
            const items = this.inventory.searchItems(query);
            this.view.renderInventory(items);
        }
    }

    updateView() {
        this.view.renderBillItems(this.bill.items);
        this.view.renderSummary(this.bill.getBillData());
    }

    openEditModal(index) {
        const item = this.bill.items[index];
        this.currentEditIndex = index;

        document.getElementById('editItemName').value = item.name;
        document.getElementById('editOriginalPrice').value = `₹${item.originalPrice}`;
        document.getElementById('editNewPrice').value = item.price;
        document.getElementById('editQuantity').value = item.quantity;

        document.getElementById('editPriceModal').classList.add('active');
    }

    closeEditModal() {
        document.getElementById('editPriceModal').classList.remove('active');
        this.currentEditIndex = null;
    }

    saveEdit() {
        const newPrice = parseFloat(document.getElementById('editNewPrice').value);
        const quantity = parseInt(document.getElementById('editQuantity').value);

        if (isNaN(newPrice) || newPrice <= 0) {
            this.view.showNotification('Please enter a valid price', 'error');
            return;
        }

        if (isNaN(quantity) || quantity <= 0) {
            this.view.showNotification('Please enter a valid quantity', 'error');
            return;
        }

        this.bill.updateItemPrice(this.currentEditIndex, newPrice, quantity);
        this.closeEditModal();
        this.view.showNotification('Item updated successfully', 'success');
    }

    openCheckoutModal() {
        if (this.bill.items.length === 0) {
            this.view.showNotification('Please add items to generate bill', 'warning');
            return;
        }

        // Populate customer info
        document.getElementById('checkoutCustomerName').value = this.view.customerNameInput.value;
        document.getElementById('checkoutCustomerContact').value = this.view.customerContactInput.value;
        document.getElementById('checkoutBillNumber').textContent = this.bill.billNumber;
        document.getElementById('checkoutBillDate').textContent = this.view.formatDate(this.bill.date);

        // Render checkout items
        this.renderCheckoutItems();

        // Set discount and update summary
        const currentDiscount = parseFloat(this.view.discountInput.value) || 0;
        document.getElementById('checkoutDiscount').value = currentDiscount;
        this.updateCheckoutSummary(currentDiscount);

        document.getElementById('checkoutModal').classList.add('active');
    }

    renderCheckoutItems() {
        const itemsList = document.getElementById('checkoutItemsList');
        const items = this.bill.items;

        itemsList.innerHTML = items.map(item => `
            <div class="checkout-item">
                <div class="checkout-item-left">
                    <div class="checkout-item-icon">${this.getItemIcon(item.name)}</div>
                    <div class="checkout-item-info">
                        <div class="checkout-item-name">${item.name}</div>
                        <div class="checkout-item-details">
                            ₹${item.price} × ${item.quantity}
                            ${item.isPriceModified ? '<span style="color: #f39c12;"> (Modified)</span>' : ''}
                        </div>
                    </div>
                </div>
                <div class="checkout-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
    }

    getItemIcon(itemName) {
        // Find the icon from inventory
        const inventoryItem = this.inventory.items.find(item => item.name === itemName);
        return inventoryItem ? inventoryItem.icon : '🍽️';
    }

    updateCheckoutSummary(discountPercent) {
        const subtotal = this.bill.getSubtotal();
        const tax = this.bill.getTax();
        const discount = (subtotal * discountPercent) / 100;
        const total = subtotal + tax - discount;

        document.getElementById('checkoutSubtotal').textContent = `₹${subtotal.toFixed(2)}`;
        document.getElementById('checkoutTax').textContent = `₹${tax.toFixed(2)}`;
        document.getElementById('checkoutDiscountAmount').textContent = `-₹${discount.toFixed(2)}`;
        document.getElementById('checkoutTotal').textContent = `₹${total.toFixed(2)}`;
    }

    closeCheckoutModal() {
        document.getElementById('checkoutModal').classList.remove('active');
    }

    confirmCheckout() {
        // Update customer name, contact, and discount from checkout modal
        const customerName = document.getElementById('checkoutCustomerName').value;
        const customerContact = document.getElementById('checkoutCustomerContact').value;
        const discount = parseFloat(document.getElementById('checkoutDiscount').value) || 0;

        this.view.customerNameInput.value = customerName;
        this.view.customerContactInput.value = customerContact;
        this.view.discountInput.value = discount;
        this.bill.setCustomerName(customerName);
        this.bill.setCustomerContact(customerContact);
        this.bill.setDiscount(discount);

        // Close checkout modal
        this.closeCheckoutModal();

        // Generate bill
        this.generateBill();
    }

    generateBill() {
        if (this.bill.items.length === 0) {
            this.view.showNotification('Please add items to generate bill', 'warning');
            return;
        }

        const billData = this.bill.getBillData();
        const pdfGenerator = new PDFGenerator(billData);
        
        // Show preview
        const previewContainer = document.getElementById('billPreview');
        previewContainer.innerHTML = pdfGenerator.generateHTML();
        
        document.getElementById('billPreviewModal').classList.add('active');
        
        this.currentPDFGenerator = pdfGenerator;
    }

    closePreviewModal() {
        document.getElementById('billPreviewModal').classList.remove('active');
    }

    async downloadPDF() {
        try {
            this.view.showNotification('Generating PDF...', 'info');
            
            // Wait a bit to ensure libraries are fully loaded
            await new Promise(resolve => setTimeout(resolve, 100));
            
            if (!this.currentPDFGenerator) {
                throw new Error('No bill to generate PDF from');
            }
            
            await this.currentPDFGenerator.download();
            this.view.showNotification('PDF downloaded successfully!', 'success');
        } catch (error) {
            console.error('Error generating PDF:', error);
            this.view.showNotification(`Error generating PDF: ${error.message}`, 'error');
        }
    }

    async sharePDF() {
        try {
            // Wait a bit to ensure libraries are fully loaded
            await new Promise(resolve => setTimeout(resolve, 100));
            
            if (!this.currentPDFGenerator) {
                throw new Error('No bill to share');
            }
            
            const shared = await this.currentPDFGenerator.share();
            if (!shared) {
                // Fallback to download (iOS or sharing not supported)
                await this.downloadPDF();
            }
        } catch (error) {
            console.error('Error sharing PDF:', error);
            this.view.showNotification(`Error sharing PDF: ${error.message}`, 'error');
        }
    }

    async printPDF() {
        try {
            this.view.showNotification('Preparing to print...', 'info');
            
            // Wait a bit to ensure libraries are fully loaded
            await new Promise(resolve => setTimeout(resolve, 100));
            
            if (!this.currentPDFGenerator) {
                throw new Error('No bill to print');
            }
            
            await this.currentPDFGenerator.print();
        } catch (error) {
            console.error('Error printing PDF:', error);
            this.view.showNotification(`Error printing PDF: ${error.message}`, 'error');
        }
    }
}

// ==========================================
// Initialize Application
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    new BillingController();
});
