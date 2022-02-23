export const getBadge = status => {
    switch (status) {
        case "nặng": 
            return 'danger'
        case "bình thường": 
            return 'success'
        default: 
            return 'warning'
    }
}