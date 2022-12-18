export default function (context) {
    context.$axios.onError(async e => {
        if (e.response.status === 401) {
            await context.$auth.logout()
        }
    });
    context.$axios.onRequest(config => {})
}
