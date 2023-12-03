import { IAcadFaculty } from './acadFaculty.interface';
import { acadFacultyModel } from './acadFaculty.model';

 const createAcadFacultyIntoDB = async (payload: IAcadFaculty) => {
  const result = await acadFacultyModel.create(payload);
  return result;
};
 const getAllAcadFacultyFromDB = async () => {
  const result = await acadFacultyModel.find();
  return result;
};
 const getSingleAcadFacultyFromDB = async (id: string) => {
  const result = await acadFacultyModel.findById(id);
  return result;
};

 const updateSingleAcadFacultyFromDB=async(payload:Partial<IAcadFaculty>,id:string)=>{
const result =await acadFacultyModel.findByIdAndUpdate({_id:id},payload,{
  new:true 
})
return result;
}

export const acadFacultyServices= {
  createAcadFacultyIntoDB,
  getAllAcadFacultyFromDB,
  getSingleAcadFacultyFromDB,
  updateSingleAcadFacultyFromDB
}