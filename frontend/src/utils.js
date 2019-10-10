import React from 'react'

const inject = obj => Comp => props => <Comp {...obj} {...props} />
export { inject }

export function parse_qs(qs, re=/(\w+)=([^&]+)/) {
    let obj = {}
    if (qs.startsWith('?')) {qs = qs.substr(1)}
    qs.split('&').forEach(element => {
        let match = re.exec(element)
        if (match) {obj[match[1]] = match[2]}
    })
    return obj
}