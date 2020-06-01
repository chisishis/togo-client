export const errorParser = (errorCode = 'general/blank') => {
    switch (errorCode) {

        case 'general/blank': return '';

        case 'auth/invalid-email': return 'Invalid Email'
        case 'auth/user-disabled': return 'Disabled User'
        case 'auth/user-not-found': 
        case 'auth/wrong-password': return 'Email or password is not valid'
        case 'auth/email-already-in-use': return 'Email address is already in use'
        case 'auth/too-many-requests': return 'Too manu requests. Try it again later'
        case 'auth/unauthorized-domain': return 'Unauthorized access'
        case 'auth/user-token-expired': return 'You token has exprired. Please sign-in again'
        default: return ``
    }
}