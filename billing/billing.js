/* ==========================================
   BILLING SYSTEM - SAGAR CAFE
   Architecture: MVC Pattern with Observer
   ========================================== */

// ==========================================
// Data Model (Static Inventory)
// ==========================================

// Inventory Data - Embedded for static site compatibility
const INVENTORY_DATA = {
    "beverages": [
        { "name": "Filter Coffee", "price": 40, "icon": "☕" },
        { "name": "Masala Tea", "price": 30, "icon": "🍵" },
        { "name": "Cold Coffee", "price": 60, "icon": "🥤" },
        { "name": "Badam Milk", "price": 50, "icon": "🥛" },
        { "name": "Fresh Lime Soda", "price": 40, "icon": "🍋" },
        { "name": "Mango Lassi", "price": 70, "icon": "🥭" }
    ],
    "snacks": [
        { "name": "Samosa", "price": 25, "icon": "🥟" },
        { "name": "Vada Pav", "price": 30, "icon": "🍔" },
        { "name": "Bhaji", "price": 35, "icon": "🍲" },
        { "name": "Pani Puri", "price": 40, "icon": "🥙" },
        { "name": "Dosa", "price": 60, "icon": "🫓" },
        { "name": "Idli Sambar", "price": 50, "icon": "🍚" },
        { "name": "Medu Vada", "price": 45, "icon": "🍩" },
        { "name": "Upma", "price": 40, "icon": "🥣" }
    ],
    "meals": [
        { "name": "Thali (Veg)", "price": 120, "icon": "🍛" },
        { "name": "Paneer Butter Masala", "price": 150, "icon": "🧈" },
        { "name": "Dal Tadka", "price": 100, "icon": "🫘" },
        { "name": "Chole Bhature", "price": 90, "icon": "🫔" },
        { "name": "Biryani", "price": 130, "icon": "🍚" },
        { "name": "Pulao", "price": 80, "icon": "🍛" },
        { "name": "Fried Rice", "price": 85, "icon": "🍚" }
    ],
    "desserts": [
        { "name": "Gulab Jamun", "price": 40, "icon": "🍡" },
        { "name": "Rasgulla", "price": 40, "icon": "⚪" },
        { "name": "Jalebi", "price": 35, "icon": "🥨" },
        { "name": "Ice Cream", "price": 50, "icon": "🍦" },
        { "name": "Kulfi", "price": 45, "icon": "🍨" },
        { "name": "Donut", "price": 50, "icon": "🍩" },
        { "name": "Brownie", "price": 60, "icon": "🍫" }
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
        const dateStr = date.toISOString().slice(2, 10).replace(/-/g, '');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `SC${dateStr}${random}`;
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
        this.discountPercent = 0;
        this.notify();
    }

    setCustomerName(name) {
        this.customerName = name;
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
        this.billNumberInput = document.getElementById('billNumber');
        this.billDateInput = document.getElementById('billDate');
        this.discountInput = document.getElementById('discountPercent');
        
        // Summary elements
        this.subtotalEl = document.getElementById('subtotal');
        this.taxEl = document.getElementById('tax');
        this.discountEl = document.getElementById('discount');
        this.totalEl = document.getElementById('total');
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
        const { billNumber, date, customerName, items, subtotal, tax, taxPercent, discount, discountPercent, total } = this.billData;
        
        return `
            <div class="bill-template" style="max-width: 600px; margin: 0 auto; font-family: 'Poppins', sans-serif; padding: 0; border: 2px solid #d4af37;">
                <div class="bill-header" style="text-align: center; border-bottom: 2px solid #d4af37; padding: 0.75rem 1rem 0.5rem; margin-bottom: 0.75rem;">
                    <img src="../resources/SagarCafeKitchenLogo.png" alt="Sagar Cafe Logo" style="width: 80px; height: auto; margin-bottom: 0.5rem;">
                    <h1 style="font-family: 'Playfair Display', serif; color: #2c3e50; margin-bottom: 0.25rem; font-size: 1.5rem;">
                        Sagar Cafe
                    </h1>
                    <p class="tagline" style="color: #7f8c8d; font-size: 0.75rem; font-style: italic; margin: 0;">
                        Brewing Happiness, One Cup at a Time
                    </p>
                    <p style="color: #7f8c8d; font-size: 0.7rem; margin-top: 0.25rem;">
                        📍 Your Neighborhood Cafe | ☎️ +91 1234567890
                    </p>
                </div>

                <div class="bill-info" style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.75rem; padding: 0 1rem;">
                    <div class="bill-info-left">
                        <p><strong>Bill No:</strong> ${billNumber}</p>
                        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-IN')}</p>
                        <p><strong>Time:</strong> ${new Date(date).toLocaleTimeString('en-IN')}</p>
                    </div>
                    <div class="bill-info-right" style="text-align: right;">
                        <p><strong>Customer:</strong> ${customerName}</p>
                        <p><strong>Payment:</strong> Cash</p>
                    </div>
                </div>

                <div style="padding: 0 1rem;">
                <table class="bill-table" style="width: 100%; border-collapse: collapse; margin-bottom: 0.75rem;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #d4af37, #e67e22); color: white;">
                            <th style="padding: 0.5rem; text-align: left; font-weight: 600; font-size: 0.85rem;">Item</th>
                            <th style="padding: 0.5rem; text-align: center; font-weight: 600; font-size: 0.85rem;">Qty</th>
                            <th style="padding: 0.5rem; text-align: right; font-weight: 600; font-size: 0.85rem;">Price</th>
                            <th style="padding: 0.5rem; text-align: right; font-weight: 600; font-size: 0.85rem;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                            <tr>
                                <td style="padding: 0.4rem; border-bottom: 1px solid #dee2e6; color: #2c3e50; font-size: 0.8rem;">
                                    ${item.name}
                                    ${item.isPriceModified ? '<span style="color: #f39c12; font-size: 0.7rem;"> (Modified)</span>' : ''}
                                </td>
                                <td style="padding: 0.4rem; border-bottom: 1px solid #dee2e6; text-align: center; color: #2c3e50; font-size: 0.8rem;">${item.quantity}</td>
                                <td style="padding: 0.4rem; border-bottom: 1px solid #dee2e6; text-align: right; color: #2c3e50; font-size: 0.8rem;">₹${item.price.toFixed(2)}</td>
                                <td style="padding: 0.4rem; border-bottom: 1px solid #dee2e6; text-align: right; color: #2c3e50; font-size: 0.8rem;">₹${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="bill-totals" style="margin-left: auto; width: 300px; margin-bottom: 0.75rem;">
                    <div class="bill-totals-row" style="display: flex; justify-content: space-between; padding: 0.5rem 0; color: #2c3e50;">
                        <span>Subtotal:</span>
                        <span>₹${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="bill-totals-row" style="display: flex; justify-content: space-between; padding: 0.5rem 0; color: #2c3e50;">
                        <span>Tax (${taxPercent}%):</span>
                        <span>₹${tax.toFixed(2)}</span>
                    </div>
                    ${discount > 0 ? `
                        <div class="bill-totals-row" style="display: flex; justify-content: space-between; padding: 0.5rem 0; color: #27ae60;">
                            <span>Discount (${discountPercent}%):</span>
                            <span>-₹${discount.toFixed(2)}</span>
                        </div>
                    ` : ''}
                    <div class="bill-totals-total" style="border-top: 2px solid #d4af37; margin-top: 0.5rem; padding-top: 0.75rem; font-size: 1.2rem; font-weight: 700; color: #000; display: flex; justify-content: space-between;">
                        <span>Total:</span>
                        <span>₹${total.toFixed(2)}</span>
                    </div>
                </div>

                <div class="bill-footer" style="text-align: center; border-top: 2px solid #d4af37; padding: 0.75rem 1rem; color: #7f8c8d; font-size: 0.75rem;">
                    <p class="thank-you" style="font-size: 0.9rem; color: #d4af37; font-weight: 600; margin-bottom: 0.3rem;">
                        Thank You! Visit Again! 🙏
                    </p>
                    <p style="font-size: 0.7rem;">GST No: 27XXXXX1234X1ZX | FSSAI Lic: 12345678901234</p>
                    <p style="margin-top: 0.25rem; font-size: 0.65rem;">
                        🌐 www.sagarcafe.in | 📧 info@sagarcafe.in
                    </p>
                    <p style="margin-top: 0.25rem; font-style: italic; color: #95a5a6; font-size: 0.65rem;">
                        This is a computer-generated bill
                    </p>
                </div>
                </div>
            </div>
        `;
    }

    async generatePDF() {
        const { jsPDF } = window.jspdf;
        
        // Create temporary container
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.innerHTML = this.generateHTML();
        document.body.appendChild(tempContainer);

        try {
            // Generate canvas from HTML
            const canvas = await html2canvas(tempContainer.querySelector('.bill-template'), {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            
            return pdf;
        } finally {
            document.body.removeChild(tempContainer);
        }
    }

    async download() {
        const pdf = await this.generatePDF();
        pdf.save(`SagarCafe_Bill_${this.billData.billNumber}.pdf`);
    }

    async share() {
        const pdf = await this.generatePDF();
        const blob = pdf.output('blob');
        
        const file = new File([blob], `SagarCafe_Bill_${this.billData.billNumber}.pdf`, {
            type: 'application/pdf'
        });

        if (navigator.share && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    title: `Bill - ${this.billData.billNumber}`,
                    text: `Bill from Sagar Cafe - Total: ₹${this.billData.total.toFixed(2)}`,
                    files: [file]
                });
                return true;
            } catch (error) {
                console.error('Error sharing:', error);
                return false;
            }
        } else {
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
        document.getElementById('checkoutBillNumber').value = this.bill.billNumber;
        document.getElementById('checkoutBillDate').value = this.view.formatDate(this.bill.date);

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
        // Update customer name and discount from checkout modal
        const customerName = document.getElementById('checkoutCustomerName').value;
        const discount = parseFloat(document.getElementById('checkoutDiscount').value) || 0;

        this.view.customerNameInput.value = customerName;
        this.view.discountInput.value = discount;
        this.bill.setCustomerName(customerName);
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
            await this.currentPDFGenerator.download();
            this.view.showNotification('PDF downloaded successfully!', 'success');
        } catch (error) {
            console.error('Error generating PDF:', error);
            this.view.showNotification('Error generating PDF', 'error');
        }
    }

    async sharePDF() {
        try {
            const shared = await this.currentPDFGenerator.share();
            if (!shared) {
                // Fallback to download if sharing not supported
                this.view.showNotification('Sharing not supported. Downloading instead...', 'info');
                await this.downloadPDF();
            }
        } catch (error) {
            console.error('Error sharing PDF:', error);
            this.view.showNotification('Error sharing PDF', 'error');
        }
    }
}

// ==========================================
// Initialize Application
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    new BillingController();
});
