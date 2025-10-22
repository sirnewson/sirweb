# Firebase Storage Setup Guide

## ⚠️ ISSUE: Upload Stuck at "Uploading 1 file(s)..."

This happens when Firebase Storage rules are blocking uploads. Follow these steps to fix it:

---

## 🔧 SOLUTION: Configure Storage Rules

### Step 1: Go to Firebase Console
1. Visit: https://console.firebase.google.com/
2. Select your project: **sirnewson-6f757**
3. Click **Storage** in the left sidebar
4. Click **Rules** tab at the top

### Step 2: Update Storage Rules

**IMPORTANT:** Replace your current rules with this:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow anyone to read files
    match /{allPaths=**} {
      allow read: if true;
    }

    // Allow uploads to gallery folder
    match /gallery/{fileName} {
      allow write: if true;
      allow delete: if true;
    }

    // Allow uploads to articles folder
    match /articles/{fileName} {
      allow write: if true;
      allow delete: if true;
    }
  }
}
```

### Step 3: Publish Rules
1. Click **Publish** button
2. Wait 30 seconds for rules to propagate
3. Try uploading again from dashboard

---

## 🔒 SECURITY NOTE

**Current Setup:** Open uploads (anyone can upload to gallery/articles folders)

**For Production:** You should add authentication checks:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow anyone to read
    match /{allPaths=**} {
      allow read: if true;
    }

    // Only authenticated users can upload
    match /gallery/{fileName} {
      allow write: if request.auth != null;
      allow delete: if request.auth != null;
    }

    match /articles/{fileName} {
      allow write: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

**But for now**, use the open rules above to test uploads.

---

## 🐛 DEBUGGING

### Check Browser Console (F12)
Look for these errors:

**Error 1: "storage/unauthorized"**
- **Cause:** Storage rules are blocking
- **Fix:** Update rules as shown above

**Error 2: "storage/quota-exceeded"**
- **Cause:** Free tier limit reached (5GB)
- **Fix:** Upgrade to Blaze plan

**Error 3: "storage/object-not-found"**
- **Cause:** Trying to read non-existent file
- **Fix:** This is normal, ignore it

**Error 4: "storage/unknown"**
- **Cause:** Network issue or Firebase down
- **Fix:** Check internet, retry later

### Enable Verbose Logging

Open browser console and run:
```javascript
firebase.storage.setLogLevel('debug');
```

Then try upload again. You'll see detailed logs.

---

## ✅ VERIFICATION STEPS

After updating rules:

1. **Test Upload:**
   - Go to dashboard-new.html
   - Click Gallery tab
   - Fill form and select image
   - Click "Upload to Gallery"
   - Check console for logs

2. **Expected Console Logs:**
   ```
   Starting upload... {title: "...", category: "...", fileCount: 1}
   Uploading file: example.jpg Size: 123456 bytes
   Storage ref created: gallery/1234567890_example.jpg
   Upload 1 is 25.0% done
   Upload 1 is 50.0% done
   Upload 1 is 75.0% done
   Upload 1 is 100.0% done
   Upload complete, getting URL...
   File uploaded successfully: https://...
   All files uploaded: ["https://..."]
   Document saved with ID: abc123
   ✅ Gallery item uploaded successfully!
   ```

3. **Verify in Firebase:**
   - Go to Firebase Console → Storage
   - Click "Files" tab
   - You should see `gallery/` folder
   - Inside should be your uploaded file

---

## 🚨 COMMON ISSUES

### Issue 1: Still stuck after updating rules
**Solution:** Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Issue 2: "storage is not defined"
**Solution:** Already fixed in latest code. Pull latest changes.

### Issue 3: File uploads but doesn't appear on site
**Solution:**
- Check that `urls` array is being saved to Firestore
- Verify Firebase config matches in both dashboard and site
- Clear browser cache

### Issue 4: CORS error
**Solution:**
- Firebase Storage CORS is configured automatically
- If you see CORS errors, contact Firebase support

---

## 📊 STORAGE LIMITS

**Free Tier (Spark Plan):**
- 5 GB stored
- 1 GB downloaded/day
- 20,000 uploads/day
- 50,000 downloads/day

**Paid Tier (Blaze Plan):**
- $0.026 per GB stored
- $0.12 per GB downloaded
- Unlimited uploads/downloads

**Recommendation:** Start with free tier, upgrade when needed.

---

## 🔗 HELPFUL LINKS

- Firebase Storage Docs: https://firebase.google.com/docs/storage
- Security Rules: https://firebase.google.com/docs/storage/security
- Console: https://console.firebase.google.com/

---

## ✨ AFTER FIXING

Once uploads work:
1. Test uploading image
2. Test uploading video
3. Check work.html to see gallery
4. Verify dashboard stats update

**You should see:**
- ✅ Upload progress (0% → 100%)
- ✅ Success notification
- ✅ Form resets
- ✅ File appears in Firebase Storage
- ✅ Entry created in Firestore
- ✅ Stats counter increments

---

**Need Help?** Check browser console (F12) for detailed error messages.
