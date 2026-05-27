# MedEase AI API Routes

Base URL: `/api`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

## Topics

- `GET /topics`
- `GET /topics?subject=pathology`
- `GET /topics?q=anemia`
- `GET /topics/:idOrSlug`

## Progress

Requires `Authorization: Bearer <token>`.

- `GET /progress`
- `POST /progress/complete/:topicId`
- `DELETE /progress/complete/:topicId`
- `POST /progress/bookmark/:topicId`
- `DELETE /progress/bookmark/:topicId`
- `POST /progress/quiz-score`

## AI

- `POST /ai/chat`
- `POST /ai/generate-notes`
- `POST /ai/generate-mcqs`
- `POST /ai/study-plan`

## Admin

Requires admin JWT.

- `POST /admin/topics`
- `PATCH /admin/topics/:id`
- `DELETE /admin/topics/:id`

Seed admin:

```txt
admin@medease.ai
admin123
```

Demo student:

```txt
doctor gouri sharma
1234
```
