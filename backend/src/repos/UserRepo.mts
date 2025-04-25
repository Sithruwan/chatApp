import User from "../models/UserModel.mjs";



export const findOrCreateUser = async (username: string) => {
  
    //   // First try to find the user
    //   let user = await User.findOne({
    //     where: { name: username }
    //   });
      
    //   // If user doesn't exist, create one
    //   if (!user) {
    //     user = await User.create({ name: username });
    //   }
      
    //   return user;
    const [user, created] = await User.findOrCreate({
        where: { name: username },
        defaults: { name: username },
      });
      console.log('UserRepo: User found or created:', user.get({ plain: true }), 'Created:', created);
      return { user, created };
   
  }

export const getUserById = async (id:number)=>{
    const user = await User.findByPk(id)
    return user
}

export const deleteUserbyName = async (name:string)=>{
    const user = await User.destroy({
        where: {
            name: name
        }
    })
    return user
}