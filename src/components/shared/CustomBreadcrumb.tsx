import { SlashIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "react-router-dom";
import React from "react";

interface Props {
  items: { id: number; href: string; title: string }[];
}

const CustomBreadcrumb = ({ items }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          if (index > 0) {
            return (
              <React.Fragment key={item.id}>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <Link to={item.href}>{item.title}</Link>
                </BreadcrumbItem>
              </React.Fragment>
            );
          }
          return (
            <BreadcrumbItem key={item.id}>
              <Link to={item.href}>{item.title}</Link>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
