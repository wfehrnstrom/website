export default function Blog(blog){
  this.title = blog.title
  this.date = new Date(blog.date)
  this.backgroundImgSrc  = blog.imagename
  this.type = blog.type
  this.content = blog.content
}
