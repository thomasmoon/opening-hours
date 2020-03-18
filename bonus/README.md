# Extras

Here are a couple of things that I encountered on my journey in understanding Wolt as part of the process for this task, although not directly related to the task.

## Design Review

### Wolt.fi Search

The website is very nice, there's not much room for improvement! One thing that stuck out for me however, was the search field that seemed a bit naked and its purpose somewhat unclear.

My proposal to improve it, would be to change the text to give information about what can be searched for, restaurants in this case.

![Screenshot](/bonus/wolt.fi-design-review-search.png?raw=true "Screenshot")

[Design Review PDF](/bonus/wolt.fi-design-review-search.pdf?raw=true)

## CloudFront 401 Error

There is a 401 "unauthorized" error with a query regarding the user from the url: `https://restaurant-api.wolt.com/v1/user/me`

Here is the response returned from the server:
```
{
    msg: "Näyttäisi, että tämän selaimen istunto Wolt.comissa on vanhentunut. Paras ratkaisu pulmaan on kirjautua ulos ja sitten takaisin sisään. Tämän pitäisi auttaa. Anteeksi vaivasta!",
    status: "ERR",
    error_code: 304,
    data: null,
    params: null
}
```

![401 Error](/bonus/Wolt.fi_401_error.png?raw=true "401 Error")