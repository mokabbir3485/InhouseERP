﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityEntity
{
   public class ad_Organization
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }
        public string BIN { get; set; }
        public string TIN { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
    }
}
