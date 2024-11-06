const projects = require('../Models/projectModel')

exports.addProject = async (req,res) => {
    try{
        const { title, description, languages, github, demo} = req.body
        const image = req.file.filename
        const userId = req.payload
        console.log(userId)
        if(!title || !description || !languages || !github || !demo || !image ) {
            res.status(406).json("Invalid Data!!")        
        }
        else {
            const existingProject = await projects.findOne({github})
            if(existingProject) {
                res.status(406).json("Project Already Exiists !!")
            }
            else {
                const newProject = new projects ({
                    title,description,languages,github,demo,image,userId
                })
                await newProject.save()
                res.status(200).json(newProject)
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json(err)
        
    }


}

exports.getProjects = async(req,res)=>{
    try {
        const userId = req.payload
        const projectlist = await projects.find({userId})
        res.status(200).json(projectlist)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

}

exports.deleteProject = async(req,res)=>{
    try {
        const {pid} = req.params
        const pro = await projects.findByIdAndDelete(pid)
        res.status(200).json(pro)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.updateProject = async(req,res)=>{
    try {
        const {pid} = req.params
        const userId = req.payload
        if(req.file){
            var image = req.file.filename
            var { title, description, languages, github, demo} = req.body

        }
        else{
            var { title, description, languages, github, demo, image} = req.body
        }
        const pro = await projects.findByIdAndUpdate(pid,
            { title, description, languages, github, demo, image})
            res.status(200).json(pro)
        
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
}