# Avatar Generation Prompts for Personalization System

Prompts for generating photorealistic avatars using Midjourney, DALL-E, or similar AI image generators.

## File Structure Expected

The system expects avatars at:
- `/public/images/avatars/{geoBucket}-{gender}.jpg`
- `/public/images/avatar.jpg` (neutral control)

Where:
- `geoBucket`: `us`, `north-america`, `europe`, `asia`, `south-america`, `oceania`, `africa`, `global`
- `gender`: `male` or `female`

## Base Prompt Template

```
Professional headshot portrait of a [GENDER] software architect, [AGE] years old, [ETHNICITY], friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

## Specific Avatar Prompts

### Neutral Control Avatar (`/images/avatar.jpg`)
**Most important - this is the default/control**

```
Professional headshot portrait of a software architect, neutral and approachable expression, professional business casual attire, soft natural lighting, clean neutral background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot, diverse representation
```

### US Avatars

**us-male.jpg:**
```
Professional headshot portrait of a male software architect, 35-45 years old, diverse ethnicity, friendly and approachable expression, professional business casual attire (collared shirt or polo), soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

**us-female.jpg:**
```
Professional headshot portrait of a female software architect, 35-45 years old, diverse ethnicity, friendly and approachable expression, professional business casual attire (blouse or collared shirt), soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

### North America Avatars

**north-america-male.jpg:**
```
Professional headshot portrait of a male software architect, 35-45 years old, North American professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

**north-america-female.jpg:**
```
Professional headshot portrait of a female software architect, 35-45 years old, North American professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

### Europe Avatars

**europe-male.jpg:**
```
Professional headshot portrait of a male software architect, 35-45 years old, European professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

**europe-female.jpg:**
```
Professional headshot portrait of a female software architect, 35-45 years old, European professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

### Asia Avatars

**asia-male.jpg:**
```
Professional headshot portrait of a male software architect, 35-45 years old, Indian ethnicity, South Asian professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

**asia-female.jpg:**
```
Professional headshot portrait of a female software architect, 35-45 years old, Indian ethnicity, South Asian professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

### South America Avatars

**south-america-male.jpg:**
```
Professional headshot portrait of a male software architect, 35-45 years old, South American professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

**south-america-female.jpg:**
```
Professional headshot portrait of a female software architect, 35-45 years old, South American professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

### Oceania Avatars

**oceania-male.jpg:**
```
Professional headshot portrait of a male software architect, 35-45 years old, Australian or New Zealand professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

**oceania-female.jpg:**
```
Professional headshot portrait of a female software architect, 35-45 years old, Australian or New Zealand professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

### Africa Avatars

**africa-male.jpg:**
```
Professional headshot portrait of a male software architect, 35-45 years old, African professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

**africa-female.jpg:**
```
Professional headshot portrait of a female software architect, 35-45 years old, African professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

### Global Avatars (Fallback)

**global-male.jpg:**
```
Professional headshot portrait of a male software architect, 35-45 years old, diverse international professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

**global-female.jpg:**
```
Professional headshot portrait of a female software architect, 35-45 years old, diverse international professional, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot
```

## Midjourney-Specific Tips

### Aspect Ratio
Use `--ar 1:1` for square avatars (standard for profile pictures)

### Style
Add `--style raw` for more photorealistic results, or `--stylize 100` for balanced style

### Quality
Use `--quality 2` or `--q 2` for higher quality (uses more credits)

### Example Full Midjourney Prompt:
```
Professional headshot portrait of a male software architect, 35-45 years old, diverse ethnicity, friendly and approachable expression, professional business casual attire, soft natural lighting, clean background, photorealistic, high quality, 8k resolution, professional LinkedIn-style headshot --ar 1:1 --style raw --quality 2
```

## DALL-E 3 / ChatGPT Specific Tips

### Style Modifiers
- Add: "professional photography", "studio lighting", "portrait photography"
- Avoid: "cartoon", "illustration", "artistic"

### Example DALL-E Prompt:
```
Create a professional headshot portrait photograph of a male software architect, age 35-45, diverse ethnicity, friendly and approachable expression, wearing professional business casual attire (collared shirt), soft natural studio lighting, clean neutral background, photorealistic professional photography style, high quality portrait, square format
```

## Consistency Guidelines

1. **Age Range**: Keep all avatars in 35-45 age range (experienced professional)
2. **Expression**: Friendly, approachable, professional (slight smile, warm eyes)
3. **Attire**: Business casual (no suits, but professional)
4. **Lighting**: Soft, natural, professional (avoid harsh shadows)
5. **Background**: Clean, neutral, blurred or solid color
6. **Crop**: Head and shoulders, centered, square format
7. **Diversity**: Ensure diverse representation across all avatars
8. **Quality**: High resolution (at least 512x512, preferably 1024x1024)

## Post-Processing Notes

After generation:
1. Crop to square (1:1 aspect ratio)
2. Resize to consistent dimensions (recommended: 512x512 or 1024x1024)
3. Ensure consistent color grading/tone
4. Save as JPG with quality 85-90
5. Name files exactly as specified (e.g., `us-male.jpg`)

## Testing Checklist

After generating all avatars:
- [ ] All files named correctly
- [ ] All files are square (1:1 aspect ratio)
- [ ] Consistent quality and style across all avatars
- [ ] Neutral avatar (`avatar.jpg`) is truly neutral/representative
- [ ] Files are in `/public/images/avatars/` directory
- [ ] Neutral control is in `/public/images/avatar.jpg`

## Alternative: Use Stock Photos

If AI generation doesn't work well, consider:
- Unsplash (free, high quality)
- Pexels (free, diverse)
- Generated Photos (AI-generated, diverse)
- Look for "professional headshot" or "business portrait"

Search terms: "professional headshot", "business portrait", "corporate headshot", "LinkedIn photo"
