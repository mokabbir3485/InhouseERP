using System;
using System.Collections.Generic;
using System.Linq;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_DesignationBLL //: IDisposible
    {
        public ad_DesignationBLL()
        {
            //ad_DesignationDAO = ad_Designation.GetInstanceThreadSafe;
            ad_DesignationDAO = new ad_DesignationDAO();
        }

        public ad_DesignationDAO ad_DesignationDAO { get; set; }

        public List<ad_Designation> GetAll()
        {
            try
            {
                return ad_DesignationDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Designation> GetById(int designationId)
        {
            try
            {
                return ad_DesignationDAO.GetAll(designationId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Designation> GetAllByDepartmentId(int departmentId)
        {
            try
            {
                return ad_DesignationDAO.GetByDepartmentId(departmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Designation> GetAllActiveByDepartmentId(int departmentId)
        {
            try
            {
                var lstDesignation = new List<ad_Designation>();
                lstDesignation = ad_DesignationDAO.GetByDepartmentId(departmentId);
                lstDesignation = lstDesignation.Where(d => d.IsActive).ToList();
                return lstDesignation;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Designation> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_DesignationDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Designation> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_DesignationDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Designation ad_Designation)
        {
            try
            {
                return ad_DesignationDAO.Add(ad_Designation);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_Designation ad_Designation)
        {
            try
            {
                return ad_DesignationDAO.Update(ad_Designation);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int designationId)
        {
            try
            {
                return ad_DesignationDAO.Delete(designationId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}