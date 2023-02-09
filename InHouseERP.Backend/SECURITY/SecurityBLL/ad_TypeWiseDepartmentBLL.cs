using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_TypeWiseDepartmentBLL //: IDisposible
    {
        public ad_TypeWiseDepartmentBLL()
        {
            //ad_TypeWiseDepartmentDAO = ad_TypeWiseDepartment.GetInstanceThreadSafe;
            ad_TypeWiseDepartmentDAO = new ad_TypeWiseDepartmentDAO();
        }

        public ad_TypeWiseDepartmentDAO ad_TypeWiseDepartmentDAO { get; set; }

        public List<ad_TypeWiseDepartment> GetByDepartmentId(int departmentId)
        {
            try
            {
                return ad_TypeWiseDepartmentDAO.GetByDepartmentId(departmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_TypeWiseDepartment ad_TypeWiseDepartment)
        {
            try
            {
                return ad_TypeWiseDepartmentDAO.Add(ad_TypeWiseDepartment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}