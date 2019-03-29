export default (value) => {
    const date = new Date(value)
    return date.toLocaleString(['en-GB'], {day: '2-digit',month: 'short',year: 'numeric',
hour: '2-digit', minutes: '2-digit'})
}