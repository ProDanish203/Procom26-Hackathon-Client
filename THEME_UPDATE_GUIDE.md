# Theme Update Guide - Black Base with Gold & White

## ✅ What's Been Done

### 1. Global CSS Theme (app/globals.css)
- **Updated `:root`** to use black base theme by default
- **Colors changed:**
  - Background: Deep black (`oklch(0.145 0 0)`)
  - Foreground: White (`oklch(0.985 0 0)`)
  - Primary & Accent: Gold (`oklch(0.7 0.15 85)`)
  - Cards: Dark gray (`oklch(0.205 0 0)`)
  - Borders: Subtle white with transparency
  - Gold color: `#D4AF37` (preserved)

### 2. Updated Components
The following components have been converted to use CSS variables:

#### Core Pages:
- ✅ `app/(root)/page.tsx` - Home page
- ✅ `app/(root)/accounts/page.tsx` - Accounts page
- ✅ `app/(root)/analyzer/page.tsx` - Analyzer page
- ✅ `app/(root)/dashboard/page.tsx` - Dashboard page

#### Components:
- ✅ `components/accounts/account-card.tsx`
- ✅ `components/shared/app-sidebar.tsx` (Fixed: white text default, gold on hover, black text + gold bg when active)
- ✅ `components/shared/financial/stat-card.tsx`
- ✅ `components/shared/financial/financial-page-header.tsx`
- ✅ `components/shared/financial/ai-insights-card.tsx`
- ✅ `components/dashboard/dashboard-header.tsx`
- ✅ `components/dashboard/balance-overview.tsx`
- ✅ `components/dashboard/quick-actions.tsx`
- ✅ `components/dashboard/quick-stats.tsx`
- ✅ `components/dashboard/recent-transactions.tsx`
- ✅ `components/dashboard/emi-summary.tsx`
- ✅ `components/dashboard/upcoming-bills.tsx`
- ✅ `components/dashboard/chatbot-widget.tsx`

## 🎨 CSS Variables to Use

Instead of hardcoded colors, use these Tailwind classes:

### Backgrounds:
- `bg-background` - Main background (black)
- `bg-card` - Card backgrounds (dark gray)
- `bg-muted` - Muted backgrounds
- `bg-gold` - Gold accent background
- `bg-sidebar` - Sidebar background

### Text Colors:
- `text-foreground` - Main text (white)
- `text-muted-foreground` - Secondary text (gray)
- `text-gold` - Gold accent text
- `text-card-foreground` - Card text

### Borders:
- `border-border` - Default borders
- `border-gold` - Gold borders
- `border-gold/10` - Subtle gold borders (10% opacity)
- `border-gold/20` - Light gold borders (20% opacity)

### Other:
- `ring-gold` - Focus rings
- `shadow-gold/30` - Gold shadows

## 📋 Components Still Needing Updates

The following components still have hardcoded colors and need manual updates:

### Payment Components:
- `components/payments/recent-payment-activity.tsx`
- `components/payments/mobile-topup-form.tsx`
- `components/payments/quick-beneficiaries.tsx`
- `components/payments/bill-payment-form.tsx`
- `components/payments/fund-transfer-form.tsx`

### Transaction Components:
- `components/transactions/transaction-filters.tsx`
- `components/transactions/receipt-modal.tsx`
- `components/transactions/transactions-table.tsx`

### Split Components:
- `components/split/split-breakdown.tsx`
- `components/split/participant-selector.tsx`
- `components/split/bill-input.tsx`

### Card Components:
- `components/cards/security-settings-card.tsx`
- `components/cards/balance-details-card.tsx`

### Dashboard Components:
- ~~`components/dashboard/emi-summary.tsx`~~ ✅ DONE
- ~~`components/dashboard/recent-transactions.tsx`~~ ✅ DONE
- ~~`components/dashboard/quick-stats.tsx`~~ ✅ DONE

### Analyzer Components:
- `components/analyzer/upload-section.tsx`
- `components/analyzer/expenditure-trend.tsx`
- `components/analyzer/category-allocation.tsx`

### UI Components:
- `components/ui/tabs.tsx`
- `components/ui/slider.tsx`

## 🔄 How to Update Remaining Components

For each component, replace:

1. **Hardcoded colors:**
   - `#D4AF37` → Use `text-gold` or `bg-gold` classes
   - `#000000` or `text-black` → `text-foreground`
   - `text-white` → `text-foreground` (in dark theme context)
   - `bg-white` → `bg-card` or `bg-background`
   - `text-gray-400`, `text-gray-500`, etc. → `text-muted-foreground`
   - `bg-gray-50` → `bg-muted`

2. **Inline styles:**
   ```tsx
   // Before:
   style={{ backgroundColor: GOLD }}
   
   // After:
   className="bg-gold"
   ```

3. **Color constants:**
   ```tsx
   // Before:
   const GOLD = '#D4AF37';
   
   // After:
   // Remove the constant and use Tailwind classes
   ```

## 🎯 Quick Reference

### Common Replacements:
- `bg-white` → `bg-card`
- `text-black` → `text-foreground`
- `text-gray-400` → `text-muted-foreground`
- `text-gray-500` → `text-muted-foreground`
- `border-gray-100` → `border-border`
- `bg-gray-50` → `bg-muted`
- Gold buttons: `bg-gold text-black hover:bg-gold/90`

## 🚀 Testing

After updating components:
1. Check the page in your browser
2. Verify all text is readable (white on black)
3. Ensure gold accents are visible
4. Test hover states and interactions
5. Check that borders are subtle but visible

## 💡 Tips

- The theme now defaults to black, so you don't need to add a `.dark` class
- Gold should be used for accents, highlights, and primary actions
- White text should be the default for readability
- Use opacity modifiers (`/10`, `/20`, `/30`) for subtle effects
