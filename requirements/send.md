# Send e-mail

Send e-mail endpoint is found on the `/api/send` path via `POST` HTTP method.

## Parameters

This endpoint is used to send e-mail, it accepts the following parameters:

| field      | type       | description                                                                            | required |
| ---------- | ---------- | -------------------------------------------------------------------------------------- | -------- |
| `from`     | `string`   | The e-mail address of the sender.                                                      | ✅       |
| `to`       | `string[]` | An `array` of recipients e-mail addresses that will appear on the **To** field.        | ✅       |
| `title`    | `string`   | The title of the e-mail.                                                               | ✅       |
| `message`  | `string`   | E-mail message.                                                                        | ✅       |
| `login`    | `string`   | Your e-mail login to you be authentication in the Google e-mail service.               | ✅       |
| `password` | `string`   | Your app password available by Google to be authenticate in the Google e-mail service. | ✅       |
| `username` | `string`   | Your username or alias.                                                                | ❌       |

> To know more about the apps password, [click here](https://myaccount.google.com/apppasswords).

The API will go to return **no content** when your e-mail went to sended with success.

## Errors

1. If some of the required properties doesn't sent for API request, an error HTTP 400 will be returned.
2. An internal server error occurs in API during request, the API will return HTTP 500 error.
3. If email doesn't sended with success, the API will return HTTP 400 error with an message that occurred a failed.

The API error object will contain the follow properties:

| field   | type     | description                          | required |
| ------- | -------- | ------------------------------------ | -------- |
| `error` | `string` | The error message returned from API. | ✅       |
