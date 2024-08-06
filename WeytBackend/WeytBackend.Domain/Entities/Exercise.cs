﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeytBackend.Domain.Entities
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PrimaryMuscle { get; set; }
        public string Type { get; set; }
        public string Image { get; set; }

    }
}