# Thread Calculator Reference

## Navigation

### Thread Standards
- **Imperial** - UNC, UNF, UNEF, NPT/NPTF threads
- **Metric** - ISO metric threads

### Thread Types (Imperial Only)
- **UNC/UNF/UNEF** - Unified threads for fasteners
- **NPT/NPTF (Pipe)** - Tapered threads for fluid systems

## Tabs Overview

### 1. Tap Drill Calculator
**Use for:** Calculating tap drill size for any thread
- Input: Major diameter, TPI, engagement %
- Output: Tap drill diameter, thread depth
- Works for both imperial and metric

### 2. Thread Depth
**Use for:** Calculating thread dimensions and clearance holes
- Input: Major diameter, pitch/TPI, thread class
- Output: Thread height, minor/pitch diameters, stress area
- Includes clearance hole recommendations

### 3. Torque & Engagement *(New - Imperial Unified Only)*
**Use for:** Finding proper torque and engagement length
- **Inputs:**
  - Tapped hole material (Steel, Aluminum, Cast Iron, Brass, Plastic)
  - Fastener grade (2, 5, or 8)
- **Outputs:**
  - Dry torque range (lb-ft)
  - Lubricated torque range (lb-ft)
  - Minimum engagement length
  - Recommended engagement length

**Material Engagement Multipliers:**
| Material | Engagement | Notes |
|----------|-----------|--------|
| Steel | 1.0× diameter | Best for thread strength |
| Aluminum | 1.5× diameter | Softer, needs more threads |
| Cast Iron | 1.5× diameter | Can be brittle |
| Brass | 1.5× diameter | Softer material |
| Plastic | 2.0× diameter | Requires double engagement |

### 4. NPT/NPTF Calculator *(New - NPT Only)*
**Use for:** Pipe thread specifications and installation
- **Specifications Table:**
  - Nominal OD
  - TPI
  - Tap drill (fractional and decimal)
  - Pitch diameter at gage plane
  - Hand-tight turns
  - Wrench make-up turns
  - Total turns for proper seal

**Installation Steps:**
1. Clean threads thoroughly
2. Apply PTFE tape (2-3 wraps) for NPT (NOT needed for NPTF)
3. Hand-tighten and count turns
4. Wrench-tighten additional turns per table
5. DO NOT exceed recommended turns

**Key Differences:**
| Feature | NPT | NPTF |
|---------|-----|------|
| Sealant | Required (PTFE/Dope) | NOT required |
| Seal Type | Sealant fills gaps | Metal-to-metal |
| Applications | General plumbing | Fuel, hydraulics |
| Compatibility | Fits both NPT/NPTF | Male fits NPT female only |

### 5. Thread Reference *(Enhanced)*
**Use for:** Looking up standard thread specifications

**Filter Options:**
- Thread type: ALL, UNC, UNF, UNEF
- Drill size for: 50%, 60%, 70%, 75%, 80% thread

**Thread % Guide:**
| Engagement | Use Case | Material |
|-----------|----------|----------|
| 50% | Easy tapping | Very soft materials |
| 60% | Soft materials | Aluminum, brass |
| 70% | General purpose | Most applications |
| 75% | **Standard** | Default for most work |
| 80% | High strength | Critical applications |

**Table Includes:**
- Thread size (e.g., 1/4-20)
- Thread type (UNC/UNF/UNEF)
- Major diameter
- TPI
- 5 drill sizes with decimals for each engagement %

## Quick Tips

### Choosing Thread Engagement %
```
Soft materials (Al, Plastic) → 50-60%
Standard applications       → 75%
High strength needed        → 80%
```

### Torque Selection
```
Dry threads     → Higher torque
Lubricated      → ~80% of dry torque
Grade 2         → Light duty
Grade 5         → General purpose (most common)
Grade 8         → High strength critical
```

### Blind vs. Through Holes
```
Through hole → Standard engagement length
Blind hole   → Add 3-5 threads (0.5× diameter) for chips
```

### NPT Installation
```
1/16" - 3/8"  → 4 hand + 4-5 wrench = 8-9 total turns
1/2" - 3/4"   → 5 hand + 6 wrench = 11 total turns
1" - 2"       → 5 hand + 7 wrench = 12 total turns
2-1/2" - 3"   → 6 hand + 8-10 wrench = 14-16 total turns
```

## Common Thread Sizes at a Glance

### Small Fasteners
| Size | TPI (UNC) | TPI (UNF) | 75% Tap Drill |
|------|-----------|-----------|---------------|
| #4-40 | 40 | - | 3/32" |
| #6-32 | 32 | - | #36 |
| #8-32 | 32 | - | #29 |
| #10-24 | 24 | 32 | #25 / #21 |

### Common Fasteners
| Size | TPI (UNC) | TPI (UNF) | 75% Tap Drill UNC/UNF |
|------|-----------|-----------|---------------------|
| 1/4" | 20 | 28 | #7 / #3 |
| 5/16" | 18 | 24 | F / I |
| 3/8" | 16 | 24 | 5/16 / Q |
| 1/2" | 13 | 20 | 27/64 / 29/64 |
| 5/8" | 11 | 18 | 17/32 / 37/64 |
| 3/4" | 10 | 16 | 21/32 / 11/16 |

### NPT Pipe Threads
| Size | TPI | Tap Drill | Total Turns |
|------|-----|-----------|-------------|
| 1/8 | 27 | S (0.348") | 8 |
| 1/4 | 18 | 7/16" | 9 |
| 3/8 | 18 | 37/64" | 9 |
| 1/2 | 14 | 23/32" | 11 |
| 3/4 | 14 | 59/64" | 11 |
| 1 | 11.5 | 1-5/32" | 12 |

## Torque Quick Reference (Grade 5, Dry)

| Thread Size | Torque Range (lb-ft) |
|-------------|---------------------|
| 1/4-20 | 6 - 9 |
| 5/16-18 | 13 - 19 |
| 3/8-16 | 23 - 33 |
| 1/2-13 | 75 - 105 |
| 5/8-11 | 150 - 210 |
| 3/4-10 | 280 - 395 |

*Note: Reduce by ~20% for lubricated threads*

## Troubleshooting

### Thread Won't Start
- ✓ Clean threads
- ✓ Start by hand (never with tools)
- ✓ Check for cross-threading
- ✓ Verify correct thread pitch

### NPT Leaking
- ✓ Check turns count (not enough/too many)
- ✓ Verify sealant applied correctly
- ✓ Inspect threads for damage
- ✓ Confirm NPT vs NPTF compatibility

### Threads Stripping
- ✓ Increase engagement length
- ✓ Use correct drill size (try 70% instead of 80%)
- ✓ Check material compatibility
- ✓ Reduce torque

### Tap Breaking
- ✓ Use correct drill size (larger = less engagement but easier)
- ✓ Reduce engagement % (70% instead of 75%)
- ✓ Use cutting fluid
- ✓ Back off frequently to clear chips

## Best Practices

1. **Always start threads by hand** - prevents cross-threading
2. **Use cutting fluid** - extends tap life and improves finish
3. **Follow torque specs** - prevents damage and ensures reliability
4. **Clear chips from blind holes** - prevents tap breakage
5. **Use thread inserts for soft materials** - extends life with repeated assembly
6. **Apply PTFE tape correctly** - 2-3 wraps, away from first thread
7. **Don't exceed NPT turn counts** - will crack fittings
8. **Lubricate for disassembly** - anti-seize on stainless, especially

## Material Compatibility Chart

| Bolt Material | Into Steel | Into Aluminum | Into Cast Iron | Into Plastic |
|---------------|-----------|---------------|----------------|--------------|
| Steel Grade 2 | ✓ Standard | ✓ Use inserts | ✓ Be careful | ⚠ Use inserts |
| Steel Grade 5 | ✓ Best | ⚠ May strip | ⚠ May crack | ✗ Too strong |
| Steel Grade 8 | ✓ Best | ✗ Will strip | ✗ Will crack | ✗ Too strong |
| Stainless | ⚠ Anti-seize | ✓ Good | ✓ OK | ⚠ Use inserts |
| Brass | ⚠ Weak | ✓ Good | ✓ Good | ✓ OK |

✓ = Good, ⚠ = Caution, ✗ = Not recommended

