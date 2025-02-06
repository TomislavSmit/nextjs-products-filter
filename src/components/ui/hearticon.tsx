'use client'

import { Heart } from 'lucide-react'

export default function HeartIcon({ fill }: { fill?: string }) {
    if (!fill) {
        return <Heart />
    }

    return <Heart fill={fill} stroke={fill} />
}
