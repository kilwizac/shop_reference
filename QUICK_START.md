# Quick Start Guide

## 🎯 What's New

Three major improvements have been implemented:

1. **Shared Calculation Library** (`lib/calc.ts`) - All formulas in one place with TypeScript types
2. **Data Externalization** (`data/*.json`) - Materials, threads, and fits in JSON files  
3. **Query State Hook** (`lib/hooks/useQueryState.ts`) - Auto-sync form state ↔ URL

## 🚀 Quick Usage

### Using Shared Calculations

```typescript
import { 
  calculateVolume, 
  calculateMilling, 
  calculateTapDrill,
  calculateFit 
} from '@/lib/calc';

// Material calculations
const volume = calculateVolume('rectangle', 12, 2, 1, 0, 0);
// Returns: 24 in³

const result = calculateMilling(0.5, 600, 4, 0.002, 'imperial');
// Returns: { rpm: 4584, feedRate: 36.67, mrr: ... }

// Thread calculations
const tapDrill = calculateTapDrill(0.25, 20, 75);
// Returns: { tapDrillDiameter: 0.2013, threadDepth: 0.0325 }

// Tolerance calculations
const fit = calculateFit(30, 'H7', 'g6');
// Returns: { fitType: "Clearance Fit", holeMax, shaftMin, ... }
```

### Using Data Files

```typescript
import materials from '@/data/materials.json';
import threadsUNC from '@/data/threads-unc.json';
import cuttingSpeeds from '@/data/cutting-speeds.json';

// Use materials
const steel = materials.steel;
console.log(steel.density); // 0.284 lb/in³

// Use thread data
const quarterTwenty = threadsUNC.find(t => t.size === "1/4-20");
console.log(quarterTwenty.tapDrill); // "#7"

// Use cutting speeds
console.log(cuttingSpeeds.aluminum.sfm); // 600
```

### Using Query State Hook

```typescript
import { useQueryState } from '@/lib/hooks/useQueryState';

function MyCalculator() {
  const { state, updateState, getShareableUrl } = useQueryState(
    { 
      diameter: '',
      length: '',
      material: 'steel'
    },
    'calc' // URL prefix
  );

  // Update state (auto-syncs to URL)
  updateState({ diameter: '0.5' });
  
  // Get shareable link
  const shareUrl = getShareableUrl(state);
  // → https://example.com/page?calc_diameter=0.5&calc_length=...
  
  return (
    <div>
      <input 
        value={state.diameter}
        onChange={(e) => updateState({ diameter: e.target.value })}
      />
      {/* State automatically loads from URL on page load */}
    </div>
  );
}
```

## 🧪 Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI dashboard
npm run test:ui

# Run tests once (for CI/CD)
npm run test:run
```

**Test Results:**
✅ 31/31 tests passing
- Material calculations: 10 tests
- Thread calculations: 6 tests  
- Tolerance calculations: 9 tests

## 📁 New Files

```
lib/
├── calc.ts                    # ⭐ Shared calculation library
├── calc.test.ts              # ⭐ Unit tests
├── hooks/
│   └── useQueryState.ts      # ⭐ URL state sync hook

data/                         # ⭐ All new
├── materials.json           # Material properties
├── threads-unc.json         # Imperial threads
├── threads-metric.json      # Metric threads  
├── iso286-fits.json        # Tolerance fits
└── cutting-speeds.json     # Cutting speeds
```

## 📊 Available Calculations

### Material Calculator
- `calculateVolume()` - 9 shapes supported
- `calculateSurfaceArea()` - Surface area
- `calculateSectionProperties()` - I, Z, r values
- `calculateThermalExpansion()` - Thermal growth

### Thread Calculator
- `calculateTapDrill()` - Imperial tap drills
- `calculateMetricTapDrill()` - Metric tap drills
- `calculateThreadDepth()` - Thread geometry

### Tolerance Calculator
- `calculateITTolerance()` - ISO 286 grades
- `calculateFit()` - Fit analysis
- `calculateBilateralTolerance()` - Tolerance limits
- `convertRoughness()` - Surface finish

- `calculateMilling()` - Milling parameters
- `calculateTurning()` - Turning parameters
- `calculateDrilling()` - Drilling parameters

## ⚡ Benefits

- ✅ **Single source of truth** for all calculations
- ✅ **Type-safe** with full TypeScript support
- ✅ **Tested** with comprehensive unit tests
- ✅ **Maintainable** data in JSON files
- ✅ **Shareable URLs** with query state hook
- ✅ **Zero breaking changes** to existing code

## 📚 Further Reading

See `IMPLEMENTATION_SUMMARY.md` for detailed API documentation, migration guide, and architecture decisions.