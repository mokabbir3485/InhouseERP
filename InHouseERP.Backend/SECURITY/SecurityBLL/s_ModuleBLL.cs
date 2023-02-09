using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class s_ModuleBLL //: IDisposible
    {
        public s_ModuleBLL()
        {
            //s_ModuleDAO = s_Module.GetInstanceThreadSafe;
            s_ModuleDAO = new s_ModuleDAO();
        }

        public s_ModuleDAO s_ModuleDAO { get; set; }

        public List<s_Module> GetByDomainId(int? domainId = null)
        {
            try
            {
                return s_ModuleDAO.GetByDomainId(domainId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<s_ScreenDetail> GetAllFunction()
        {
            try
            {
                return s_ModuleDAO.GetAllFunction();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_Module> GetActive()
        {
            try
            {
                return s_ModuleDAO.GetActive();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_Module> GetExAdminSecurity()
        {
            try
            {
                return s_ModuleDAO.GetExAdminSecurity();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_Module s_Module)
        {
            try
            {
                return s_ModuleDAO.Add(s_Module);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(s_Module s_Module)
        {
            try
            {
                return s_ModuleDAO.Update(s_Module);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int domainId)
        {
            try
            {
                return s_ModuleDAO.Delete(domainId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}