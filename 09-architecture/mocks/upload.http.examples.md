# Upload examples

Decode the tiny PNG:

```bash
base64 -d mocks/avatar.png.b64 > /tmp/avatar.png
```

## Multipart (if you implement direct upload to API)

```bash
curl -X POST http://localhost:3000/users/me/avatar \
  -H "Authorization: Bearer $ACCESS" \
  -F "file=@/tmp/avatar.png;type=image/png"
```

## Presigned flow (preferred)

```bash
# 1) ask API for upload URL
curl -s -X POST http://localhost:3000/users/me/avatar/upload-url \
  -H "Authorization: Bearer $ACCESS" \
  -H "Content-Type: application/json" \
  -d '{"contentType":"image/png"}'

# 2) PUT bytes to returned url
curl -X PUT "$UPLOAD_URL" \
  -H "Content-Type: image/png" \
  --data-binary @/tmp/avatar.png

# 3) confirm
curl -X POST http://localhost:3000/users/me/avatar/confirm \
  -H "Authorization: Bearer $ACCESS" \
  -H "Content-Type: application/json" \
  -d '{"key":"avatars/usr_xxx.png"}'
```
