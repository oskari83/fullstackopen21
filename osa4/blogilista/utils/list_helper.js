const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum,order) => { return sum + order.likes},0)
    return total
}

const favoriteBlog = (blogs) => {
    const best = blogs.reduce((max, blog) => {return max.likes > blog.likes ? max : blog},{})
    return best
}

const mostBlogs = (blogs) => {
    function groupByKey(array, key) {
        return array
          .reduce((hash, obj) => {
            if(obj[key] === undefined) return hash; 
            return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
          }, {});
    }
    Object.size = function(obj) {
        var size = 0, key
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++
        }
        return size
    }
    const authors = groupByKey(blogs,"author")
    let results = []
    for (const key in authors) {
        results.push({
          author: key,
          blogs: Object.size(authors[key]),
        })
    }
    return results.reduce((max, blog) => {return max.blogs > blog.blogs ? max : blog},{})
}

const mostLikes = (blogs) => {
    let authorLikes = blogs.reduce((op, {author, likes}) => {
        op[author] = op[author] || 0
        op[author] += likes
        return op
    },{})
    let results = []
    for (const key in authorLikes) {
        results.push({
          author: key,
          likes: authorLikes[key]
        })
    }
    console.log(results)
    return results.reduce((max, blog) => {return max.likes > blog.likes ? max : blog},{})
}

module.exports = {
  dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
}