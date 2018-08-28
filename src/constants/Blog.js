export default function Blog(blog){
  this.title = blog.title
  this.date = new Date(blog.date)
  this.backgroundImg  = blog.image
  this.type = blog.type
  this.content = blog.content
}
