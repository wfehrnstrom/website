import {PROJECT_TYPES, STATUS} from './index'
import {loadJSONFile} from './helpers'

function Project(authors, title, repo, status, createdOn, finishedOn, logo, imgs, summary, type=PROJECT_TYPES["CS"], urls=null){
  this.authors = authors
  this.title = title
  this.repo = repo
  this.status = status
  this.createdOn = createdOn
  this.finishedOn = finishedOn
  this.logo = logo
  this.imgs = imgs
  this.summary = summary
  this.type = type
  this.urls = urls
}

function ProjectsFromJson(jsonFile){
  let jsonMapping = loadJSONFile(jsonFile, 'title')
  jsonMapping.forEach(function(project, key, map){
    project.createdOn = new Date(project.createdOn)
    project.finishedOn = project.finishedOn ? new Date(project.finishedOn) : null
    project.type = PROJECT_TYPES[project.type]
    project.status = STATUS[project.status]
  })
  return jsonMapping
}

function combineProjectAndImages(authorImages, projectImages, project){
  let authors = null
  if(project.authors){
    project.authors = project.authors.map(function(author, index){
      return {name: author.name, img: authorImages[index]}
    })
  }
  return Object.assign(project, {imgs: projectImages})
}

export {Project, ProjectsFromJson, combineProjectAndImages}
