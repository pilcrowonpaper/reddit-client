import { writable, type Writable } from 'svelte/store';

const postsToLoad: Writable<readonly number[]> = writable(Object.freeze([]));
export default postsToLoad

const postsInView : number[] = []

export const newPostInView = (id: number) => {
    console.log(id)
    postsToLoad.update($postsToLoad => {
       if (postsInView.includes(id)) return $postsToLoad
       postsInView.push(id)
       const result = calculatePostsToLoad()
       console.log(result)
       return result
    })
}

export const newPostOutsideView = (id: number) => {
    postsToLoad.update($postsToLoad => {
        if (!postsInView.includes(id)) return $postsToLoad
        postsInView.splice(postsInView.indexOf(id), 1)
        return calculatePostsToLoad()
     })
}

export const calculatePostsToLoad = () : number[] => {
    const post_at_top = Math.min(...postsInView)
    const post_at_bottom = Math.max(...postsInView)
    const result : number[] = []
    for (let i = post_at_top - 6; i <= post_at_bottom + 8; i++) {
        if (i < 0) continue
        result.push(i)
    }
    return result
}